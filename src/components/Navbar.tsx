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
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const isHome = location.pathname === '/'

  const barsRef = useRef(
    sectionIds.reduce((acc, id) => {
      acc[id] = { sweep: useMotionValue(0) }
      return acc
    }, {} as Record<string, { sweep: MotionValue<number> }>)
  )

  const derivedRef = useRef<Record<string, { left: MotionValue<string>; width: MotionValue<string> }>>({})

  for (const id of sectionIds) {
    const sweep = barsRef.current[id].sweep
    const left = useTransform(sweep, (s: number) => (s <= 100 ? '0%' : `${s - 100}%`))
    const width = useTransform(sweep, (s: number) => {
      const w = s <= 100 ? s : 200 - s
      return w < 3 ? '0%' : `${w}%`
    })
    derivedRef.current[id] = { left, width }
  }

  useEffect(() => {
    const els = sectionIds.map(id => document.getElementById(id))

    const handleScroll = () => {
      const vh = window.innerHeight
      const viewportCenter = vh / 2

      let bestSection = ''
      let bestProgress = 0

      for (let i = 0; i < sectionIds.length; i++) {
        const el = els[i]
        if (!el) {
          barsRef.current[sectionIds[i]].sweep.set(0)
          continue
        }

        const rect = el.getBoundingClientRect()
        const sectionCenter = rect.top + rect.height / 2
        const distance = sectionCenter - viewportCenter
        const half = rect.height / 2 + vh * 0.2
        const progress = Math.max(0, Math.min(1, 1 - Math.abs(distance) / half))

        const targetSweep = distance < 0
          ? 100 + (1 - progress) * 100
          : progress * 100

        barsRef.current[sectionIds[i]].sweep.set(targetSweep)

        if (progress > bestProgress) {
          bestProgress = progress
          bestSection = sectionIds[i]
        }
      }

      if (bestSection && window.scrollY > 0) {
        setActiveSection(prev => (prev !== bestSection ? bestSection : prev))
      } else if (window.scrollY === 0) {
        setActiveSection('')
      }
    }

    let lastRun = 0
    const THROTTLE_MS = 50

    const onScroll = () => {
      const now = performance.now()
      if (now - lastRun < THROTTLE_MS) return
      lastRun = now
      handleScroll()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
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
      <div className="relative mx-auto flex max-w-5xl items-center justify-center px-6 py-2.5">

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map(link => {
            const isActive = activeSection === link.id

            return (
              <button
                key={link.href}
                onClick={() => isHome ? scrollTo(link.href) : (window.location.href = `/${link.href}`)}
                className={`relative px-4 py-1.5 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:rounded ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                <motion.div
                  className="absolute bottom-0 h-0.5 rounded-full bg-blue-600 dark:bg-blue-400"
                  style={{
                    left: derivedRef.current[link.id].left,
                    width: derivedRef.current[link.id].width,
                  }}
                />
              </button>
            )
          })}

          <button
            onClick={toggleTheme}
            className="ml-6 rounded-lg p-2 min-h-[44px] min-w-[44px] text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 min-h-[44px] min-w-[44px] text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 min-h-[44px] min-w-[44px] text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
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
