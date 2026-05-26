'use client'

import { useEffect } from 'react'

export default function AppSettingsSync() {
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const anchor = e.target.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href) return

      const isExternal = href.startsWith('http://') || href.startsWith('https://')
      if (!isExternal) return

      let isSameDomain = false
      try {
        const url = new URL(href)
        if (url.hostname === window.location.hostname) {
          isSameDomain = true
        }
      } catch (err) {}

      if (isSameDomain) return

      const isMarkdown = anchor.closest('.prose') || anchor.closest('.markdown-body') || anchor.closest('.markdown')
      if (isMarkdown) return

      const openInNewTab = localStorage.getItem('external-links-new-tab') !== 'false'
      if (openInNewTab) {
        anchor.setAttribute('target', '_blank')
        anchor.setAttribute('rel', 'noopener noreferrer')
      }
    }

    document.addEventListener('click', handleGlobalClick)
    return () => {
      document.removeEventListener('click', handleGlobalClick)
    }
  }, [])

  return null
}
