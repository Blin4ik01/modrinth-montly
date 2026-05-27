'use client'

import { useEffect } from 'react'

export default function AppSettingsSync() {
  useEffect(() => {
    const { hostname } = window.location

    const handleClick = ({ target }) => {
      const a = target.closest('a[href]')
      if (!a || a.target) return

      try {
        if (new URL(a.href).hostname !== hostname) {
          a.target = '_blank'
          a.rel = 'noopener noreferrer'
        }
      } catch {}
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [])

  return null
}
