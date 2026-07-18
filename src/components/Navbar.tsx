import { useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { motion, useMotionValue, animate } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'

const sectionIds = ['about', 'skills', 'experience', 'projects', 'contact']

const navLinks = [
  { href: '/#about', label: 'About', id: 'about' },
  { href: '/#skills', label: 'Skills', id: 'skills' },
  { href: '/#experience', label: 'Experience', id: 'experience' },
  { href: '/#projects', label: 'Projects', id: 'projects' },
  { href: '/#contact', label: 'Contact', id: 'contact' },
]

const springConfig = { type: 'spring', stiffness: 120, damping: 24 } as const

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [phases, setPhases] = useState<Record<string, 'enter' | 'exit' | 'idle'>>({})
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const isHome = location.pathname === '/'
  const rafRef = useRef(0)

  const barsRef = useRef(
    sectionIds.reduce((acc, id) => {
      acc[id] = {
        left: useMotionValue('0%'),
        width: useMotionValue('0%'),
      }
      return acc
    }, {} as Record<string, { left: ReturnType<typeof useMotionValue>; width: ReturnType<typeof useMotionValue> }>)
  )

  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight
      const viewportCenter = vh / 2

      let bestSection = ''
      let bestProgress = 0
      const nextPhases: Record<string, 'enter' | 'exit' | 'idle'> = {}

      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) {
          nextPhases[id] = 'idle'
          animate(barsRef.current[id].left, '0%', springConfig)
          animate(barsRef.current[id].width, '0%', springConfig)
          continue
        }

        const rect = el.getBoundingClientRect()
        const sectionCenter = rect.top + rect.height / 2
        const distance = sectionCenter - viewportCenter
        const half = rect.height / 2 + vh * 0.2
        const absDist = Math.abs(distance)
        const progress = Math.max(0, Math.min(1, 1 - absDist / half))
        const phase: 'enter' | 'exit' | 'idle' =
          progress < 0.01 ? 'idle' : distance > 0 ? 'enter' : 'exit'

        nextPhases[id] = phase

        const targetLeft = phase === 'exit' ? `${(1 - progress) * 100}%` : '0%'
        const targetWidth = `${progress * 100}%`

        animate(barsRef.current[id].left, targetLeft, springConfig)
        animate(barsRef.current[id].width, targetWidth, springConfig)

        if (progress > bestProgress) {
          bestProgress = progress
          bestSection = id
        }
      }

      if (bestSection) {
        setActiveSection(prev => (prev !== bestSection ? bestSection : prev))
      }

      setPhases(prev => {
        for (const id of sectionIds) {
          if (prev[id] !== nextPhases[id]) return nextPhases
        }
        return prev
      })
    }

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(handleScroll)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const scrollTo = (href: string) => {
    const id = href.replace('/#', '')
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
      <div className="relative mx-auto flex max-w-5xl items-center justify-center px-6 py-4">

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map(link => {
            const isActive = activeSection === link.id

            return (
              <button
                key={link.href}
                onClick={() => isHome ? scrollTo(link.href) : (window.location.href = `/${link.href}`)}
                className={`relative px-4 py-1.5 text-base font-medium transition-colors ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                <motion.div
                  className="absolute bottom-0 h-0.5 rounded-full bg-blue-600 dark:bg-blue-400"
                  style={{
                    left: barsRef.current[link.id].left,
                    width: barsRef.current[link.id].width,
                  }}
                />
              </button>
            )
          })}

          <button
            onClick={toggleTheme}
            className="ml-6 rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-gray-200 px-6 pb-4 pt-2 dark:border-gray-800 md:hidden">
          {navLinks.map(link => {
            const isActive = activeSection === link.id
            return (
              <button
                key={link.href}
                onClick={() => {
                  setMobileOpen(false)
                  isHome ? scrollTo(link.href) : (window.location.href = `/${link.href}`)
                }}
                className={`block w-full text-left py-2 text-base ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {link.label}
              </button>
            )
          })}
        </div>
      )}
    </nav>
  )
}
