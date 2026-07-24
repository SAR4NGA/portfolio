import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Skill } from '../../data/skills'
import SkillIcon from '../SkillIcon'

interface SkillsWaveCarouselProps {
  skills: Skill[]
}

const categories = ['Frontend', 'Backend', 'Tools']

function WaveRow({ category, skills }: { category: string; skills: Skill[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div>
      <h3 className="mb-3 font-mono text-xs font-bold tracking-widest text-gray-500 dark:text-gray-400 uppercase">
        {category}
      </h3>
      <div className="no-scrollbar flex overflow-x-auto gap-3 sm:gap-4 py-4 px-2" style={{ scrollbarWidth: 'none' }}>
        {skills.map((skill, index) => {
          const isHovered = hoveredIndex === index
          const isNeighbor =
            hoveredIndex !== null && Math.abs(hoveredIndex - index) === 1

          return (
            <motion.div
              key={skill.name}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{
                scale: isHovered ? 1.22 : isNeighbor ? 1.08 : 1,
                y: isHovered ? -10 : isNeighbor ? -4 : 0,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`group flex shrink-0 flex-col items-center justify-center p-4 min-w-[95px] sm:min-w-[105px] rounded-2xl transition-shadow cursor-default ${
                isHovered
                  ? 'bg-white dark:bg-gray-800 shadow-xl border border-blue-400 dark:border-blue-500 z-20'
                  : isNeighbor
                  ? 'bg-white/80 dark:bg-gray-800/80 shadow-md border border-gray-200 dark:border-gray-700 z-10'
                  : 'bg-white/60 dark:bg-gray-800/60 border border-gray-200/50 dark:border-gray-700/50 z-0'
              }`}
            >
              <div className="relative flex h-14 w-14 items-center justify-center transition-transform duration-200">
                <SkillIcon name={skill.icon} size={50} />
              </div>
              <span
                className={`mt-2 text-center text-[10px] sm:text-[11px] font-bold tracking-wider uppercase transition-colors ${
                  isHovered
                    ? 'text-blue-600 dark:text-blue-400 font-extrabold'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {skill.name}
              </span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default function SkillsWaveCarousel({ skills }: SkillsWaveCarouselProps) {
  const grouped = categories.map(cat => ({
    category: cat,
    items: skills.filter(s => s.category === cat),
  }))

  return (
    <div className="space-y-6">
      {grouped.map(({ category, items }) => (
        <WaveRow key={category} category={category} skills={items} />
      ))}
    </div>
  )
}
