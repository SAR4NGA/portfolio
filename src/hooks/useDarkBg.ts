import { useEffect } from 'react'

const PURE_PRESET = {
  main: '#000000',
  alt: '#050505',
  content: '#000000',
}

export function useDarkBg() {
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--dark-bg-main', PURE_PRESET.main)
    root.style.setProperty('--dark-bg-alt', PURE_PRESET.alt)
    root.style.setProperty('--dark-bg-content', PURE_PRESET.content)
    // Clear any old saved preference
    localStorage.removeItem('dark-bg-preset')
  }, [])
}
