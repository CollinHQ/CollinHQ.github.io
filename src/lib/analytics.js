// Privacy-conscious Google Analytics 4 loader.
//
// Analytics is OFF unless a Measurement ID is provided via the
// VITE_GA_MEASUREMENT_ID env var (e.g. "G-XXXXXXXXXX"). When it's absent
// (local dev, forks, or before setup) nothing loads and no requests are made.

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

export const analyticsEnabled = Boolean(GA_ID)

let initialized = false

export function initAnalytics() {
  if (initialized || !GA_ID || typeof window === 'undefined') return
  initialized = true

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag
  gtag('js', new Date())
  // Send page views manually on each SPA route change so we don't double-count
  // the initial load alongside our own navigation tracking.
  gtag('config', GA_ID, { send_page_view: false })
}

export function trackPageview(path) {
  if (!GA_ID || typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  })
}
