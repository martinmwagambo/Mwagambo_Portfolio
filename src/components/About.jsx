import { motion } from 'framer-motion'
import { useInView } from './useInView'

const slideIn = (delay = 0) => ({
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut', delay } },
})

const highlights = [
  { value: '4+', label: 'Years in Tech' },
  { value: '4',  label: 'Roles' },
  { value: '5+', label: 'Projects' },
  { value: '10+', label: 'Technologies' },
]

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.2 })

  return (
    <section id="about" className="py-24 bg-gray-50 dark:bg-dark-surface" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-14 items-center">

          {/* ── Left – stats + accent ── */}
          <motion.div
            variants={slideIn(0)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {highlights.map(({ value, label }) => (
                <div key={label}
                  className="rounded-2xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card p-5 text-center
                             hover:border-brand-400/40 hover:shadow-md transition-all duration-300">
                  <p className="text-3xl font-extrabold text-gradient">{value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">{label}</p>
                </div>
              ))}
            </div>

            {/* Trait pills */}
            <div className="flex flex-wrap gap-2">
              {['Problem Solver', 'Detail-Oriented', 'Adaptable', 'Team Player', 'Fast Learner'].map((trait) => (
                <span key={trait}
                  className="px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300
                             border border-brand-200/60 dark:border-brand-800/50 text-xs font-medium">
                  {trait}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── Right – first-person bio ── */}
          <motion.div
            variants={slideIn(0.15)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="flex flex-col gap-5"
          >
            <div>
              <p className="text-sm font-mono text-brand-500 mb-2 tracking-widest uppercase">About Me</p>
              <h2 className="section-heading text-gray-900 dark:text-white">Who I Am</h2>
              <div className="w-12 h-1 bg-gradient-to-r from-brand-400 to-indigo-500 rounded-full mt-3 mb-5" />
            </div>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              I'm a <strong className="text-gray-800 dark:text-gray-200 font-semibold">Full Stack Developer</strong> and{' '}
              <strong className="text-gray-800 dark:text-gray-200 font-semibold">IT Specialist</strong> based in Nairobi,
              Kenya. I build clean, functional web applications and enjoy solving real problems with code.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              I've worked across web development, content operations, and IT support — which gives me a
              well-rounded perspective on both the technical and human sides of software. I'm always learning,
              currently exploring <strong className="text-gray-800 dark:text-gray-200 font-semibold">React Native</strong>.
            </p>

            <div className="pt-1">
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                Get In Touch
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
