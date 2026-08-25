import { useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { motion, useMotionValue, useTransform, type MotionValue } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'

const sectionIds = ['about', 'skills', 'certifications', 'projects', 'contact']

const navLinks = [
  { href: '/#about', label: 'About', id: 'about' },
  { href: '/#skills', label: 'Skills', id: 'skills' },
  { href: '/#certifications', label: 'Certifications', id: 'certifications' },
  { href: '/#projects', label: 'Projects', id: 'projects' },
  { href: '/#contact', label: 'Contact', id: 'contact' },
]



export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [, setPhases] = useState<Record<string, 'enter' | 'exit' | 'idle'>>({})
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const isHome = location.pathname === '/'
  const rafRef = useRef(0)

  const barsRef = useRef(
    sectionIds.reduce((acc, id) => {
      acc[id] = { sweep: useMotionValue(0) }
      return acc
    }, {} as Record<string, { sweep: MotionValue<number> }>)
  )

  const derivedRef = useRef<Record<string, { left: MotionValue<string>; width: MotionValue<string> }>>({})

  for (const id of sectionIds) {
    const sweep = barsRef.current[id].sweep
    // sweep 0–100:  left-anchored growth  → left: 0%, width: s%
    // sweep 100–200: right-anchored shrink → left: (s-100)%, width: (200-s)%
    const left = useTransform(sweep, (s: number) => (s <= 100 ? '0%' : `${s - 100}%`))
    const width = useTransform(sweep, (s: number) => {
      const w = s <= 100 ? s : 200 - s
      return w < 3 ? '0%' : `${w}%`
    })
    derivedRef.current[id] = { left, width }
  }

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
          barsRef.current[id].sweep.set(0)
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

        const targetSweep = distance < 0
          ? 100 + (1 - progress) * 100
          : progress * 100

        barsRef.current[id].sweep.set(targetSweep)

        if (progress > bestProgress) {
          bestProgress = progress
          bestSection = id
        }
      }

      if (bestSection && window.scrollY > 0) {
        setActiveSection(prev => (prev !== bestSection ? bestSection : prev))
      } else if (window.scrollY === 0) {
        setActiveSection('')
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
    <nav className="fixed top-0 left-0 w-full z-50 pointer-events-none">
      <div className="relative mx-auto flex max-w-5xl items-center justify-center px-6 py-3">

        <div className="hidden items-center gap-3 md:flex">
          {/* Pill container — matches Skills section tab style */}
          <div className="pointer-events-auto inline-flex overflow-hidden rounded-full border border-gray-200 bg-white p-1 dark:border-gray-700 dark:bg-gray-900">
            {navLinks.map(link => {
              const isActive = activeSection === link.id

              return (
                <button
                  key={link.href}
                  onClick={() => isHome ? scrollTo(link.href) : (window.location.href = `/${link.href}`)}
                  className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    isActive
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  <motion.div
                    className="absolute bottom-0 h-0.5 rounded-full bg-gray-900 dark:bg-white"
                    style={{
                      left: derivedRef.current[link.id].left,
                      width: derivedRef.current[link.id].width,
                    }}
                  />
                </button>
              )
            })}
          </div>

          <button
            onClick={toggleTheme}
            className="pointer-events-auto rounded-full p-2 text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <div className="pointer-events-auto flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="rounded-lg p-1.5 min-h-[36px] min-w-[36px] text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-1.5 min-h-[36px] min-w-[36px] text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
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
