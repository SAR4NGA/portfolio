import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProjectCard from './ProjectCard'
import type { Project } from '../data/projects'

const CARDS_PER_SLIDE = 4
const AUTO_INTERVAL = 4000

export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const totalSlides = Math.ceil(projects.length / CARDS_PER_SLIDE)
  const [slide, setSlide] = useState(0)
  const [direction, setDirection] = useState(1)
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)

  const goTo = useCallback(
    (next: number) => {
      setDirection(next > slide ? 1 : -1)
      setSlide(next)
    },
    [slide],
  )

  const next = useCallback(() => {
    setDirection(1)
    setSlide(s => (s + 1) % totalSlides)
  }, [totalSlides])

  const prev = useCallback(() => {
    setDirection(-1)
    setSlide(s => (s - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  useEffect(() => {
    timerRef.current = setInterval(next, AUTO_INTERVAL)
    return () => clearInterval(timerRef.current)
  }, [next])

  const resetTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(next, AUTO_INTERVAL)
  }

  const currentProjects = projects.slice(slide * CARDS_PER_SLIDE, (slide + 1) * CARDS_PER_SLIDE)

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  }

  if (projects.length === 0) return null

  return (
    <div className="relative">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={slide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
          <div className="grid gap-6 sm:grid-cols-2">
            {currentProjects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {totalSlides > 1 && (
        <>
          <button
            onClick={() => { prev(); resetTimer() }}
            className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-2 min-h-[44px] min-w-[44px] shadow-sm transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={() => { next(); resetTimer() }}
            className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-2 min-h-[44px] min-w-[44px] shadow-sm transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
            aria-label="Next slide"
          >
            <ChevronRight size={20} className="text-gray-600 dark:text-gray-400" />
          </button>

          <div className="mt-6 flex items-center justify-center gap-2">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => { goTo(i); resetTimer() }}
                className={`h-2 rounded-full transition-all ${
                  i === slide
                    ? 'w-6 bg-blue-600 dark:bg-blue-400'
                    : 'w-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
