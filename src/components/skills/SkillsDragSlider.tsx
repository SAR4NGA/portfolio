import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Skill } from '../../data/skills'
import SkillIcon from '../SkillIcon'

interface SkillsDragSliderProps {
  skills: Skill[]
}

const categories = ['Frontend', 'Backend', 'Tools']

function SliderRow({ category, skills }: { category: string; skills: Skill[] }) {
  const containerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return
    const scrollAmount = direction === 'left' ? -300 : 300
    containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-mono text-xs font-bold tracking-widest text-gray-500 dark:text-gray-400 uppercase">
          {category}
        </h3>
        <div className="flex items-center gap-1">
          <button
            onClick={() => scroll('left')}
            className="rounded-full p-1.5 text-gray-400 hover:bg-gray-200 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="rounded-full p-1.5 text-gray-400 hover:bg-gray-200 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="relative py-2">
        <div
          ref={containerRef}
          className="no-scrollbar flex overflow-x-auto gap-4 scroll-smooth py-2 px-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              whileHover={{ y: -6, scale: 1.05 }}
              className="group flex shrink-0 flex-col items-center justify-center p-4 min-w-[100px] sm:min-w-[110px] rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-200/60 dark:border-gray-700/60 shadow-sm transition-all hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 cursor-grab active:cursor-grabbing"
            >
              <div className="relative flex h-14 w-14 items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <SkillIcon name={skill.icon} size={50} />
              </div>
              <span className="mt-2 text-center text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function SkillsDragSlider({ skills }: SkillsDragSliderProps) {
  const grouped = categories.map(cat => ({
    category: cat,
    items: skills.filter(s => s.category === cat),
  }))

  return (
    <div className="space-y-6">
      {grouped.map(({ category, items }) => (
        <SliderRow key={category} category={category} skills={items} />
      ))}
    </div>
  )
}
