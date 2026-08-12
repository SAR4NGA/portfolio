import { useEffect } from 'react'

const PURE_PRESET = {
  main: '#000000',
  alt: '#050505',
  content: '#000000',
}

const VARS = ['--dark-bg-main', '--dark-bg-alt', '--dark-bg-content'] as const

export function useDarkBg() {
  useEffect(() => {
    const root = document.documentElement

    function applyVars() {
      if (root.classList.contains('dark')) {
        root.style.setProperty('--dark-bg-main', PURE_PRESET.main)
        root.style.setProperty('--dark-bg-alt', PURE_PRESET.alt)
        root.style.setProperty('--dark-bg-content', PURE_PRESET.content)
      } else {
        // Remove dark-bg variables in light mode so CSS fallbacks work
        for (const v of VARS) root.style.removeProperty(v)
      }
    }

    // Apply on mount
    applyVars()

    // Watch for class changes (theme toggle)
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === 'class') {
          applyVars()
          break
        }
      }
    })
    observer.observe(root, { attributes: true, attributeFilter: ['class'] })

    // Clear any old saved preference
    localStorage.removeItem('dark-bg-preset')

    return () => observer.disconnect()
  }, [])
}
