import { FiGithub, FiLinkedin, FiHeart } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="py-8 border-t border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
          Built with <FiHeart size={13} className="text-red-400" /> by{' '}
          <span className="font-semibold text-gray-700 dark:text-gray-300">Martin Mwagambo</span>
          &nbsp;· {new Date().getFullYear()}
        </p>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/martinmwagambo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2 rounded-lg text-gray-400 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all"
          >
            <FiGithub size={17} />
          </a>
          <a
            href="https://www.linkedin.com/in/martin-mwagambo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-2 rounded-lg text-gray-400 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all"
          >
            <FiLinkedin size={17} />
          </a>
        </div>
      </div>
    </footer>
  )
}
