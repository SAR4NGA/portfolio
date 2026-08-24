import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { GithubIcon } from './Icons'
import type { Project } from '../data/projects'

const AUTO_INTERVAL = 6000

export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const total = projects.length
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)

  const next = useCallback(() => {
    setDirection(1)
    setCurrent(s => (s + 1) % total)
  }, [total])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent(s => (s - 1 + total) % total)
  }, [total])

  const goTo = useCallback(
    (idx: number) => {
      setDirection(idx > current ? 1 : idx < current ? -1 : 0)
      setCurrent(idx)
    },
    [current],
  )

  // Auto-advance
  useEffect(() => {
    if (isPaused) return
    timerRef.current = setInterval(next, AUTO_INTERVAL)
    return () => clearInterval(timerRef.current)
  }, [next, isPaused])

  const resetTimer = () => {
    clearInterval(timerRef.current)
    if (!isPaused) {
      timerRef.current = setInterval(next, AUTO_INTERVAL)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { next(); resetTimer() }
      if (e.key === 'ArrowLeft') { prev(); resetTimer() }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [next, prev])

  if (total === 0) return null

  const prevIdx = (current - 1 + total) % total
  const nextIdx = (current + 1) % total

  const project = projects[current]
  const prevProject = projects[prevIdx]
  const nextProject = projects[nextIdx]

  // Slide animation for the center card
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  }

  // Side card (prev/next preview)
  const SideCard = ({
    proj,
    side,
    onClick,
  }: {
    proj: Project
    side: 'left' | 'right'
    onClick: () => void
  }) => (
    <button
      onClick={onClick}
      className={`hidden lg:flex flex-col w-full rounded-xl border border-gray-200 bg-white/60 overflow-hidden text-left backdrop-blur-sm transition-all duration-300 hover:border-blue-200 hover:bg-white/80 dark:border-gray-800 dark:bg-gray-950/60 dark:hover:border-blue-900 dark:hover:bg-gray-950/80 cursor-pointer ${
        side === 'left' ? 'items-end text-right' : 'items-start text-left'
      }`}
      aria-label={`Go to project: ${proj.title}`}
    >
      {/* Side card image */}
      {proj.image && (
        <div className="w-full h-20 overflow-hidden">
          <img
            src={proj.image}
            alt={proj.title}
            className="h-full w-full object-cover opacity-60"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-4">
        <h4 className="mb-1 text-sm font-semibold text-gray-400 dark:text-gray-500 truncate max-w-full">
          {proj.title}
        </h4>
        <p className="text-xs text-gray-400 dark:text-gray-600 line-clamp-2">
          {proj.description || 'No description yet.'}
        </p>
      </div>
    </button>
  )

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Three-column layout: prev | active | next */}
      <div className="flex items-stretch gap-3 lg:gap-4">
        {/* Previous project preview */}
        <div className="hidden lg:flex w-[160px] shrink-0 opacity-50 hover:opacity-70 transition-opacity duration-300">
          <SideCard proj={prevProject} side="left" onClick={() => { prev(); resetTimer() }} />
        </div>

        {/* Active project — center */}
        <div className="flex-1 min-w-0 max-w-2xl mx-auto relative">
          <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
            {/* Subtle blue accent line */}
            <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-blue-500 to-blue-400 dark:from-blue-500 dark:to-blue-600 z-10" />

            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Project image */}
                {project.image && (
                  <div className="w-full h-48 sm:h-56 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="p-6 sm:p-8">
                  {/* Counter */}
                  <span className="mb-3 inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                    {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </span>

                  {/* Title */}
                  <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl dark:text-white">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-5 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                    {project.description || 'No description yet.'}
                  </p>

                  {/* Tech stack */}
                  {project.tech.length > 0 && (
                    <div className="mb-5 flex flex-wrap gap-2">
                      {project.tech.map(tech => (
                        <span
                          key={tech}
                          className="rounded-full bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                    >
                      <GithubIcon size={14} /> View Code
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Arrow buttons */}
          {total > 1 && (
            <>
              <button
                onClick={() => { prev(); resetTimer() }}
                className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-2 shadow-sm transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800 lg:-left-5"
                aria-label="Previous project"
              >
                <ChevronLeft size={18} className="text-gray-500 dark:text-gray-400" />
              </button>
              <button
                onClick={() => { next(); resetTimer() }}
                className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-2 shadow-sm transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800 lg:-right-5"
                aria-label="Next project"
              >
                <ChevronRight size={18} className="text-gray-500 dark:text-gray-400" />
              </button>
            </>
          )}
        </div>

        {/* Next project preview */}
        <div className="hidden lg:flex w-[160px] shrink-0 opacity-50 hover:opacity-70 transition-opacity duration-300">
          <SideCard proj={nextProject} side="right" onClick={() => { next(); resetTimer() }} />
        </div>
      </div>

      {/* Dot indicators with progress animation */}
      {total > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => { goTo(i); resetTimer() }}
              className="group relative h-2 overflow-hidden rounded-full transition-all duration-300"
              style={{ width: i === current ? 28 : 8 }}
              aria-label={`Go to project ${i + 1}: ${projects[i].title}`}
            >
              {/* Inactive background */}
              <span className="absolute inset-0 rounded-full bg-gray-200 dark:bg-gray-800" />
              {/* Active fill with progress */}
              {i === current && (
                <motion.span
                  className="absolute inset-0 rounded-full bg-gray-900 dark:bg-white"
                  initial={{ scaleX: 0, transformOrigin: 'left' }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: isPaused ? 0 : AUTO_INTERVAL / 1000, ease: 'linear' }}
                  key={`progress-${current}-${isPaused}`}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
