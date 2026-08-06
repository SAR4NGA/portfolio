import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <p className="mb-2 font-mono text-8xl font-bold text-gray-200 dark:text-gray-800">
          404
        </p>
        <h1 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
          Page not found
        </h1>
        <p className="mb-8 text-gray-500 dark:text-gray-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-2.5 text-base font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
        >
          Back to home
        </Link>
      </motion.div>
    </div>
  )
}
