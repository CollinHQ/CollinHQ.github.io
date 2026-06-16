import { useEffect } from 'react'

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title
      ? `${title} — Collin Brown`
      : 'Collin Brown — Workplace Experience Manager'
  }, [title])
}
