import { useEffect } from 'react'

const DEFAULT_TITLE =
  'Collin Brown — Workplace Experience Manager | Workplace & Office Coordinator'

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — Collin Brown` : DEFAULT_TITLE
  }, [title])
}
