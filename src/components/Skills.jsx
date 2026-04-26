import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from './useInView'
import { Icon } from '@iconify/react'

/* ── Tech icon definitions ── */
const techs = [
  // Row 1 – Frontend
  { icon: 'logos:react',         label: 'React',        color: '#61DAFB' },
  { icon: 'logos:javascript',    label: 'JavaScript',   color: '#F7DF1E' },
  { icon: 'logos:html-5',        label: 'HTML5',        color: '#E34F26' },
  { icon: 'logos:css-3',         label: 'CSS3',         color: '#1572B6' },
  { icon: 'logos:tailwindcss-icon', label: 'Tailwind CSS', color: '#06B6D4' },
  // Row 2 – Backend + DB
  { icon: 'logos:nodejs-icon',   label: 'Node.js',      color: '#339933' },
  { icon: 'logos:php',           label: 'PHP',          color: '#777BB4' },
  { icon: 'logos:mysql-icon',    label: 'MySQL',        color: '#4479A1' },
  { icon: 'logos:firebase',      label: 'Firebase',     color: '#FFCA28' },
  // Row 3 – Tools & Other
  { icon: 'logos:git-icon',      label: 'Git',          color: '#F05032' },
  { icon: 'logos:github-icon',   label: 'GitHub',       color: '#181717' },
  { icon: 'logos:vitejs',        label: 'Vite',         color: '#646CFF' },
  { icon: 'logos:figma',         label: 'Figma',        color: '#F24E1E' },
  { icon: 'logos:python',        label: 'Python',       color: '#3776AB' },
  { icon: 'logos:visual-studio-code', label: 'VS Code', color: '#007ACC' },
]

/* Give every icon a random but stable orbit path */
function useOrbitPositions(count) {
  return useRef(
    Array.from({ length: count }, (_, i) => ({
      x: Math.cos((i / count) * 2 * Math.PI) * (35 + (i % 3) * 12),
      y: Math.sin((i / count) * 2 * Math.PI) * (20 + (i % 4) * 8),
      delay: i * 0.18,
      duration: 3.5 + (i % 5) * 0.6,
      xAmp: 6 + (i % 4) * 3,
      yAmp: 4 + (i % 3) * 3,
    }))
  ).current
}

function TechBubble({ tech, index, inView }) {
  const orbits = useOrbitPositions(techs.length)
  const o = orbits[index]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? {
        opacity: 1,
        scale: 1,
        y: [0, -o.yAmp, 0, o.yAmp / 2, 0],
        x: [0, o.xAmp / 2, 0, -o.xAmp / 2, 0],
      } : { opacity: 0, scale: 0.5 }}
      transition={{
        opacity: { duration: 0.4, delay: o.delay },
        scale:   { duration: 0.4, delay: o.delay },
        y: { duration: o.duration, repeat: Infinity, ease: 'easeInOut', delay: o.delay },
        x: { duration: o.duration * 1.3, repeat: Infinity, ease: 'easeInOut', delay: o.delay },
      }}
      whileHover={{ scale: 1.15, zIndex: 10 }}
      className="relative flex flex-col items-center gap-1.5 cursor-default group"
    >
      {/* Icon bubble */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md
                   bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border
                   group-hover:border-brand-400/50 group-hover:shadow-lg transition-all duration-200"
        style={{ boxShadow: `0 4px 20px ${tech.color}22` }}
      >
        <Icon icon={tech.icon} width={30} height={30} />
      </div>

      {/* Tooltip label – only on hover */}
      <motion.span
        initial={{ opacity: 0, y: 4 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] font-semibold
                   whitespace-nowrap px-2 py-0.5 rounded bg-gray-900 dark:bg-dark-surface text-white
                   opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-20"
      >
        {tech.label}
      </motion.span>
    </motion.div>
  )
}

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.15 })

  return (
    <section id="skills" className="py-24 bg-white dark:bg-dark-bg" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-sm font-mono text-brand-500 mb-2 tracking-widest uppercase">Stack</p>
          <h2 className="section-heading text-gray-900 dark:text-white">Skills & Technologies</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-brand-400 to-indigo-500 rounded-full mt-3 mx-auto" />
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-3">Hover over an icon to see the tech</p>
        </motion.div>

        {/* ── Icon cloud ── */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-10 pb-6">
          {techs.map((tech, i) => (
            <TechBubble key={tech.label} tech={tech} index={i} inView={inView} />
          ))}
        </div>

        {/* Category labels below */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-14 flex flex-wrap justify-center gap-3"
        >
          {[
            { label: 'Frontend', color: 'from-blue-400 to-cyan-400' },
            { label: 'Backend',  color: 'from-green-400 to-emerald-400' },
            { label: 'Database', color: 'from-yellow-400 to-orange-400' },
            { label: 'Tools',    color: 'from-purple-400 to-pink-400' },
            { label: 'IT Support', color: 'from-red-400 to-rose-400' },
          ].map(({ label, color }) => (
            <span key={label}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${color} shadow-sm`}>
              {label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
