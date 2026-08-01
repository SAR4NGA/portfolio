import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-base text-gray-500 dark:text-gray-400">
          <span className="font-bold text-gray-700 dark:text-gray-200">&copy; {new Date().getFullYear()} Pasindu Saranga.</span> All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/SAR4NGA"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/sar4nga"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href="mailto:swpsaranga@students.nsbm.ac.lk"
            className="text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
