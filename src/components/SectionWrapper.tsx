import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionWrapperProps {
  id: string
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
}

export default function SectionWrapper({ id, title, subtitle, children, className = '' }: SectionWrapperProps) {
  return (
    <section id={id} className={`py-20 ${className}`}>
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
