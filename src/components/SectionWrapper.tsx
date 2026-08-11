import { motion } from 'framer-motion'
import type { ReactNode, CSSProperties } from 'react'

interface SectionWrapperProps {
  id: string
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
  /** Pass true for alternating "tinted" sections instead of className dark bg */
  darkAlt?: boolean
}

export default function SectionWrapper({ id, title, subtitle, children, className = '', darkAlt = false }: SectionWrapperProps) {
  // Strip the dark:bg-gray-900/50 portion from className when darkAlt is used
  const lightClass = className.replace(/dark:bg-\S+/g, '').trim()

  const style: CSSProperties = darkAlt
    ? { backgroundColor: 'var(--dark-bg-alt, rgba(17,24,39,0.5))' }
    : {}

  return (
    <section id={id} className={`py-20 ${darkAlt ? lightClass : className}`} style={style}>
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-2 font-mono text-base font-medium tracking-wider text-blue-600 dark:text-blue-400 uppercase">
            {title}
          </h2>
          {subtitle && (
            <p className="mb-10 text-3xl font-semibold text-gray-900 dark:text-white">{subtitle}</p>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  )
}
