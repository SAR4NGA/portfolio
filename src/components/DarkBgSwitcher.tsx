import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDarkBg, DARK_BG_PRESETS, type DarkBgPreset } from '../hooks/useDarkBg'
import { useTheme } from '../hooks/useTheme'
import { Palette } from 'lucide-react'

export default function DarkBgSwitcher() {
  const { theme } = useTheme()
  const { preset, changePreset } = useDarkBg()
  const [open, setOpen] = useState(false)

  // Only render in dark mode
  if (theme !== 'dark') return null

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-2">
      {/* Preset options */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="flex flex-col gap-2 mb-1"
          >
            {DARK_BG_PRESETS.map((p) => {
              const isActive = p.id === preset
              return (
                <motion.button
                  key={p.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    changePreset(p.id as DarkBgPreset)
                    setOpen(false)
                  }}
                  title={p.label}
                  className={`
                    flex items-center gap-3 rounded-full px-3 py-1.5
                    border text-xs font-medium transition-all duration-200
                    ${isActive
                      ? 'border-blue-400 bg-blue-500/20 text-blue-300'
                      : 'border-white/10 bg-black/40 text-gray-400 hover:border-white/25 hover:text-white'
                    }
                    backdrop-blur-md shadow-lg
                  `}
                >
                  {/* Color swatch */}
                  <span
                    className="h-4 w-4 rounded-full border border-white/20 shrink-0"
                    style={{ background: p.swatch }}
                  />
                  {p.label}
                  {isActive && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-400" />
                  )}
                </motion.button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        onClick={() => setOpen(prev => !prev)}
        title="Dark background options"
        className={`
          flex h-10 w-10 items-center justify-center rounded-full
          border shadow-xl backdrop-blur-md transition-all duration-200
          ${open
            ? 'border-blue-400/60 bg-blue-500/20 text-blue-300'
            : 'border-white/10 bg-black/50 text-gray-400 hover:border-white/25 hover:text-white'
          }
        `}
      >
        <Palette size={17} />
      </motion.button>
    </div>
  )
}
