import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { initAnalytics, trackPageview } from '../lib/analytics'

// Loads GA4 once (if configured) and reports a page view on every route change.
// Renders nothing.
export default function Analytics() {
  const location = useLocation()

  useEffect(() => {
    initAnalytics()
  }, [])

  useEffect(() => {
    // Defer a frame so the per-page document.title (set in each page's effect)
    // is current before we report the page view.
    const id = window.requestAnimationFrame(() =>
      trackPageview(location.pathname + location.search)
    )
    return () => window.cancelAnimationFrame(id)
  }, [location.pathname, location.search])

  return null
}
