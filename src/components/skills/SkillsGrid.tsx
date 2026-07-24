import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Skill } from '../../data/skills'
import SkillIcon from '../SkillIcon'

interface SkillsGridProps {
  skills: Skill[]
}

const categories = ['All', 'Frontend', 'Backend', 'Tools']

// Wide row = 100% container width, narrow row = 78% (ratio from 710/910)
const ROW_WIDTH_WIDE = '100%'
const ROW_WIDTH_NARROW = '78%'

function InfiniteMarqueeRow({
  skills,
  reverse = false,
  widthPercent,
}: {
  skills: Skill[]
  reverse?: boolean
  widthPercent: string
}) {
  if (skills.length === 0) return null

  // Triple items for seamless infinite loop
  const tripled = [...skills, ...skills, ...skills]

  return (
    <div
      className="group relative overflow-hidden py- mx-auto"
      style={{ width: widthPercent, maxWidth: '100%' }}
    >
      {/* Side fade masks */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-14 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-900/80" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-14 bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-900/80" />

      <div className="flex overflow-hidden">
        <div
          className={`flex shrink-0 gap-3 dark:gap-5 pr-3 dark:pr-5 group-hover:[animation-play-state:paused] ${
            reverse ? 'animate-marquee-reverse' : 'animate-marquee'
          }`}
        >
          {tripled.map((skill, i) => (
            <motion.div
              key={`${skill.name}-${i}`}
              whileHover={{ y: -6, scale: 1.08 }}
              className="group/item flex shrink-0 flex-col items-center justify-center p-3.5 sm:p-4 min-w-[90px] sm:min-w-[105px] rounded-2xl bg-gray-50 dark:bg-gray-800/90 dark:shadow-sm transition-all duration-300 dark:hover:shadow-xl cursor-default"
            >
              <div className="flex h-13 w-13 sm:h-15 sm:w-15 items-center justify-center transition-transform duration-300 group-hover/item:scale-110">
                <SkillIcon name={skill.icon} size={50} />
              </div>
              <span className="mt-2.5 text-center text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-gray-500 dark:text-gray-400 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * Build rows with alternating widths (wide–narrow–wide).
 * - Large sets (≥15): 7-5 repeating pattern with remainder redistribution.
 * - Medium/small sets (4-14): evenly split across 3 rows (wide–narrow–wide).
 * - Tiny sets (≤3): single wide row.
 */
function buildRows(skills: Skill[]): { items: Skill[]; wide: boolean }[] {
  const total = skills.length

  if (total <= 3) {
    return [{ items: skills, wide: true }]
  }

  // Large sets: use the 7-5 repeating pattern
  if (total >= 15) {
    const rows: { items: Skill[]; wide: boolean }[] = []
    const pattern = [7, 5]
    let cursor = 0
    let patternIdx = 0

    while (cursor < total) {
      const size = pattern[patternIdx % pattern.length]
      const isWide = patternIdx % 2 === 0
      rows.push({ items: skills.slice(cursor, cursor + size), wide: isWide })
      cursor += size
      patternIdx++
    }

    // Redistribute a small last row into the smallest existing rows
    const minSize = Math.min(...pattern)
    if (rows.length > 1 && rows[rows.length - 1].items.length < minSize) {
      const leftover = rows.pop()!.items
      for (const skill of leftover) {
        let smallest = rows[0]
        for (const row of rows) {
          if (row.items.length < smallest.items.length) smallest = row
        }
        smallest.items.push(skill)
      }
    }

    return rows
  }

  // Medium/small sets (4–14): split across 2 rows → wide–narrow
  const topCount = Math.ceil(total * 7 / 12) // ~58% top row (7:5 ratio)
  const bottomCount = total - topCount

  return [
    { items: skills.slice(0, topCount), wide: true },
    { items: skills.slice(topCount, topCount + bottomCount), wide: false },
  ]
}

export default function SkillsGrid({ skills }: SkillsGridProps) {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter(skill => skill.category === activeCategory)

  const rows = buildRows(filteredSkills)

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase transition-all ${
              activeCategory === category
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 dark:bg-blue-500'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Stacked centered marquee rows with alternating widths */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="w-full flex flex-col items-center gap-0 dark:gap-4"
        >
          {rows.map((row, idx) => (
            <InfiniteMarqueeRow
              key={`${activeCategory}-row-${idx}`}
              skills={row.items}
              reverse={idx % 2 === 1}
              widthPercent={row.wide ? ROW_WIDTH_WIDE : ROW_WIDTH_NARROW}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
