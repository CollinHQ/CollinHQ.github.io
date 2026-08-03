// Generates public/og-image.png (1200x630) — a branded social preview card.
// Run from repo root: node scripts/generate-og-image.mjs
import sharp from 'sharp'
import { writeFileSync } from 'node:fs'

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
    Workplace Operations Manager
  </text>

  <!-- One-liner -->
  <text x="100" y="450" fill="#94a3b8" font-family="-apple-system, Arial, sans-serif" font-size="22">
    7+ years turning empty shells into offices people are genuinely glad to walk into.
  </text>
  <text x="100" y="488" fill="#94a3b8" font-family="-apple-system, Arial, sans-serif" font-size="22">
    Most recently a 13,000 sq ft, 3-floor SF build-out run with no general contractor,
  </text>
  <text x="100" y="526" fill="#94a3b8" font-family="-apple-system, Arial, sans-serif" font-size="22">
    plus the vendors, budgets, and everyday details that make a space work for the people in it.
  </text>

  <!-- Footer URL -->
  <text x="100" y="585" fill="#64748b" font-family="-apple-system, Arial, sans-serif" font-size="22" letter-spacing="2">
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
