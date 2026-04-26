import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useInView } from './useInView'
import { FiBriefcase } from 'react-icons/fi'

const experiences = [
  {
    title: 'Operations Customer Expert',
    company: 'Teleperformance',
    location: 'Nairobi',
    period: 'Sep 2025 – Present',
    current: true,
    bullets: [
      'Transcribe and caption audio content accurately',
      'Maintain consistency and quality in high-volume tasks',
    ],
  },
  {
    title: 'Content Moderator',
    company: 'ISON Xperiences',
    location: 'Nairobi',
    period: 'Feb 2025 – Aug 2025',
    current: false,
    bullets: [
      'Reviewed user-generated content to ensure it met platform guidelines',
      'Worked efficiently while maintaining accuracy',
    ],
  },
  {
    title: 'Frontend Developer',
    company: 'AICE Africa',
    location: 'Nairobi',
    period: 'Jan 2024 – Apr 2024',
    current: false,
    bullets: [
      'Developed responsive user interfaces using React and Tailwind CSS',
      'Assisted in integrating frontend with backend systems',
    ],
  },
  {
    title: 'IT Support',
    company: 'ICT Authority',
    location: 'Kilifi',
    period: 'Jan 2021 – Aug 2021',
    current: false,
    bullets: [
      'Provided technical support for hardware and software issues',
      'Helped maintain system performance and reliability',
    ],
  },
]

/* Track which item is "active" based on scroll position */
function useActiveItem(itemRefs) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const midY = window.innerHeight / 2
      let best = 0
      let bestDist = Infinity
      itemRefs.current.forEach((el, i) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const dist = Math.abs(rect.top + rect.height / 2 - midY)
        if (dist < bestDist) { bestDist = dist; best = i }
      })
      setActive(best)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [itemRefs])

  return active
}

const slideIn = (delay = 0) => ({
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut', delay } },
})

export default function Experience() {
  const [headingRef, headingInView] = useInView({ threshold: 0.1 })
  const timelineRef = useRef(null)
  const itemRefs = useRef([])
  const active = useActiveItem(itemRefs)

  /* Scroll-driven fill for the vertical line */
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 60%'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="experience" className="py-24 bg-gray-50 dark:bg-dark-surface">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, x: -20 }}
          animate={headingInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-sm font-mono text-brand-500 mb-2 tracking-widest uppercase">Career Journey</p>
          <h2 className="section-heading text-gray-900 dark:text-white">Experience</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-brand-400 to-indigo-500 rounded-full mt-3" />
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">

          {/* ── Static grey track line ── */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-200 dark:bg-dark-border hidden md:block" />

          {/* ── Scroll-driven fill line ── */}
          <div className="absolute left-5 top-0 bottom-0 hidden md:block overflow-hidden" style={{ width: 1 }}>
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-brand-400 via-indigo-400 to-purple-400"
            />
          </div>

          {/* ── Glowing travelling dot ── */}
          <div className="absolute left-5 top-0 bottom-0 hidden md:block" style={{ width: 1 }}>
            <motion.div
              style={{ top: lineHeight }}
              className="absolute -left-2 -translate-y-1/2"
            >
              <motion.div
                animate={{ scale: [1, 1.6, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-5 h-5 rounded-full bg-brand-500 shadow-[0_0_12px_4px_rgba(99,102,241,0.6)]"
              />
            </motion.div>
          </div>

          {/* Experience cards */}
          <div className="flex flex-col gap-8">
            {experiences.map((exp, i) => {
              const isActive = active === i

              return (
                <motion.div
                  key={i}
                  ref={(el) => (itemRefs.current[i] = el)}
                  variants={slideIn(i * 0.1)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="relative md:pl-16"
                >
                  {/* ── Static timeline dot ── */}
                  <motion.div
                    animate={isActive
                      ? { scale: [1, 1.5, 1], boxShadow: ['0 0 0px 0px rgba(99,102,241,0)', '0 0 14px 6px rgba(99,102,241,0.55)', '0 0 0px 0px rgba(99,102,241,0)'] }
                      : { scale: 1, boxShadow: '0 0 0px 0px rgba(99,102,241,0)' }
                    }
                    transition={{ duration: 1.4, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }}
                    className={`absolute left-3.5 top-6 w-3 h-3 rounded-full border-2 border-white dark:border-dark-surface hidden md:block
                      ${exp.current ? 'bg-brand-500' : isActive ? 'bg-brand-400' : 'bg-gray-300 dark:bg-dark-border'}`}
                  />

                  {/* Card */}
                  <motion.div
                    animate={isActive
                      ? { borderColor: 'rgba(99,102,241,0.45)', boxShadow: '0 4px 24px rgba(99,102,241,0.1)' }
                      : { borderColor: '', boxShadow: '0 0 0 rgba(0,0,0,0)' }
                    }
                    transition={{ duration: 0.4 }}
                    className="rounded-2xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card p-6
                               transition-colors duration-300"
                  >
                    <div className="flex flex-wrap items-start gap-3 justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5
                          transition-colors duration-300
                          ${isActive
                            ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30'
                            : 'bg-brand-50 dark:bg-brand-900/20 border border-brand-200/60 dark:border-brand-800/50 text-brand-500'
                          }`}>
                          <FiBriefcase size={16} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{exp.title}</h3>
                          <p className="text-sm text-brand-500 font-medium">
                            {exp.company}&nbsp;·&nbsp;
                            <span className="text-gray-500 dark:text-gray-400 font-normal">{exp.location}</span>
                          </p>
                        </div>
                      </div>

                      <span className={`text-xs font-medium px-3 py-1.5 rounded-full mt-0.5 flex-shrink-0
                        ${exp.current
                          ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/50'
                          : 'bg-gray-100 dark:bg-dark-surface text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-dark-border'
                        }`}>
                        {exp.current && <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5 align-middle animate-pulse" />}
                        {exp.period}
                      </span>
                    </div>

                    <ul className="flex flex-col gap-2 pl-1">
                      {exp.bullets.map((b, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-300
                            ${isActive ? 'bg-brand-400' : 'bg-gray-300 dark:bg-gray-600'}`} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
