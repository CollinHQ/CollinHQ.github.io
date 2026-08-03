// Generates public/og-image.png (1200x630) — a branded social preview card.
// Title and one-liner come from src/data/about.json so the card can't drift
// from the site. The one-liner is measured and wrapped to fit, so editing the
// bio only means re-running this script.
// Run from repo root: node scripts/generate-og-image.mjs
import sharp from 'sharp'
import { readFileSync } from 'node:fs'

const about = JSON.parse(readFileSync('src/data/about.json', 'utf8'))

const BODY_FONT = '-apple-system, Arial, sans-serif'
const TEXT_X = 100
const MAX_WIDTH = 1000 // keeps the right margin equal to the 100px left margin
const BODY_START_Y = 450
const BODY_LEADING = 38
const FOOTER_GAP = 59
const BODY_SIZES = [22, 20, 18, 16] // largest first; shrinks only if the copy grows
const MAX_LINES = 3

const escapeXml = (s) =>
  s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c])

// Renders the text alone and trims to its ink bounds — the font metrics that
// matter here are librsvg's, so measuring beats estimating from character count.
async function measure(text, fontSize) {
  if (!text) return 0
  const probe = `
<svg xmlns="http://www.w3.org/2000/svg" width="4000" height="200">
  <rect width="4000" height="200" fill="#000000"/>
  <text x="10" y="120" fill="#ffffff" font-family="${BODY_FONT}" font-size="${fontSize}">
    ${escapeXml(text)}
  </text>
</svg>
`
  const { info } = await sharp(Buffer.from(probe)).trim().toBuffer({ resolveWithObject: true })
  return info.width
}

// Greedy wrap over pre-measured word widths, so the line search below is
// arithmetic rather than hundreds of renders.
function wrap(words, wordWidths, spaceWidth, limit) {
  const lines = []
  let current = []
  let width = 0
  for (const [i, word] of words.entries()) {
    const added = current.length ? spaceWidth + wordWidths[i] : wordWidths[i]
    if (current.length && width + added > limit) {
      lines.push(current.join(' '))
      current = [word]
      width = wordWidths[i]
    } else {
      current.push(word)
      width += added
    }
  }
  if (current.length) lines.push(current.join(' '))
  return lines
}

// Largest size that fits in MAX_LINES, then the tightest limit that still holds
// that line count — which evens out the ragged edge instead of leaving a stub.
async function layout(text) {
  const words = text.split(/\s+/).filter(Boolean)
  for (const size of BODY_SIZES) {
    const wordWidths = await Promise.all(words.map((word) => measure(word, size)))
    const sum = wordWidths.reduce((a, b) => a + b, 0)
    // Derive the space advance from the full line so kerning is averaged in.
    const spaceWidth = words.length > 1 ? ((await measure(text, size)) - sum) / (words.length - 1) : 0

    const lineCount = wrap(words, wordWidths, spaceWidth, MAX_WIDTH).length
    if (lineCount > MAX_LINES) continue

    let lo = Math.ceil(Math.max(...wordWidths))
    let hi = MAX_WIDTH
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2)
      if (wrap(words, wordWidths, spaceWidth, mid).length <= lineCount) hi = mid
      else lo = mid + 1
    }

    const lines = wrap(words, wordWidths, spaceWidth, lo)
    const widths = await Promise.all(lines.map((line) => measure(line, size)))
    if (Math.max(...widths) <= MAX_WIDTH) return { size, lines, widths }
  }
  throw new Error(
    `one_liner does not fit in ${MAX_LINES} lines at ${BODY_SIZES.at(-1)}px — shorten it in src/data/about.json`
  )
}

const { size: bodySize, lines: bodyLines, widths } = await layout(about.one_liner)
const footerY = BODY_START_Y + (bodyLines.length - 1) * BODY_LEADING + FOOTER_GAP

const oneLiner = bodyLines
  .map(
    (line, i) => `  <text x="${TEXT_X}" y="${BODY_START_Y + i * BODY_LEADING}" fill="#94a3b8" font-family="${BODY_FONT}" font-size="${bodySize}">
    ${escapeXml(line)}
  </text>`
  )
  .join('\n')

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0d1b2a"/>
      <stop offset="100%" stop-color="#1a2535"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#eab308" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#eab308" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- Top accent -->
  <rect x="100" y="100" width="60" height="3" fill="#eab308"/>

  <!-- Eyebrow -->
  <text x="100" y="148" fill="#eab308" font-family="Georgia, serif" font-size="22" letter-spacing="6" font-weight="500">
    WORKPLACE OPERATIONS
  </text>

  <!-- Name -->
  <text x="100" y="290" fill="#ffffff" font-family="Georgia, 'Cormorant Garamond', serif" font-size="140" font-weight="700">
    Collin Brown
  </text>

  <!-- Title -->
  <text x="100" y="360" fill="#cbd5e1" font-family="Georgia, serif" font-size="34" font-style="italic">
    ${escapeXml(about.title)}
  </text>

  <!-- One-liner -->
${oneLiner}

  <!-- Footer URL -->
  <text x="100" y="${footerY}" fill="#64748b" font-family="-apple-system, Arial, sans-serif" font-size="22" letter-spacing="2">
    collinhq.github.io
  </text>

  <!-- Right-side mark -->
  <circle cx="1050" cy="315" r="80" fill="none" stroke="#eab308" stroke-width="3"/>
  <text x="1050" y="335" text-anchor="middle" fill="#eab308" font-family="Georgia, serif" font-size="60" font-weight="700">
    CB
  </text>
</svg>
`

const out = 'public/og-image.png'
await sharp(Buffer.from(svg)).png().toFile(out)
console.log(`Wrote ${out}`)
console.log(`  title:     ${about.title}`)
console.log(`  one-liner: ${bodyLines.length} lines at ${bodySize}px (widths: ${widths.join(', ')} of ${MAX_WIDTH}px)`)
