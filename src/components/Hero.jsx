import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { FiArrowDown, FiGithub, FiLinkedin, FiDownload } from "react-icons/fi";

/* ── floating card animation ── */
const floatY = {
  animate: {
    y: [0, -14, 0],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
  },
};

/* ── subtle parallax tilt on mouse move ── */
function useTilt() {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rx = ((e.clientY - cy) / rect.height) * -10;
      const ry = ((e.clientX - cx) / rect.width) * 10;
      setTilt({ rx, ry });
    };
    const onLeave = () => setTilt({ rx: 0, ry: 0 });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return [ref, tilt];
}

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: 0.15 },
  },
};

export default function Hero() {
  const [cardRef, tilt] = useTilt();
  const shimmerControls = useAnimationControls();

  // Periodically shimmer the card border
  useEffect(() => {
    const loop = async () => {
      while (true) {
        await shimmerControls.start({
          opacity: [0.3, 1, 0.3],
          transition: { duration: 2.5, ease: "easeInOut" },
        });
        await new Promise((r) => setTimeout(r, 2000));
      }
    };
    loop();
  }, [shimmerControls]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
    >
      {/* Background gradient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand-500/8 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-400/8 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-20 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* ── Left ── */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Availability badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border
                            border-brand-300/40 dark:border-brand-700/40
                            bg-brand-50 dark:bg-brand-900/20 w-fit"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-medium text-brand-700 dark:text-brand-300">
                Available for opportunities
              </span>
            </div>

            <div>
              <p className="text-sm font-mono text-brand-500 mb-2 tracking-widest uppercase">
                Hello, I'm
              </p>
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white">
                Martin
                <br />
                <span className="text-gradient">Mwagambo</span>
              </h1>
            </div>

            <p className="text-lg md:text-xl font-semibold text-gray-600 dark:text-gray-400">
              Full Stack Developer &nbsp;·&nbsp; IT Specialist
            </p>
            <p className="text-base text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">
              "Building reliable and user-focused web solutions with modern
              technologies."
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() =>
                  document
                    .querySelector("#projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-primary"
              >
                View Projects
              </button>
              <button
                onClick={() =>
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-outline"
              >
                Contact Me
              </button>
              <a
                href="/martin-cv.pdf"
                download="Mwagambo_Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                           border border-green-300 dark:border-green-700 text-green-700 dark:text-green-400
                           bg-green-50 dark:bg-green-900/20
                           hover:bg-green-100 dark:hover:bg-green-900/40 hover:border-green-400
                           transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <FiDownload size={15} />
                Download CV
              </a>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://github.com/martinmwagambo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2.5 rounded-xl border border-gray-200 dark:border-dark-border text-gray-500 dark:text-gray-400
                           hover:text-brand-500 hover:border-brand-400 transition-all duration-200 hover:scale-110"
              >
                <FiGithub size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/martin-mwagambo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 rounded-xl border border-gray-200 dark:border-dark-border text-gray-500 dark:text-gray-400
                           hover:text-brand-500 hover:border-brand-400 transition-all duration-200 hover:scale-110"
              >
                <FiLinkedin size={18} />
              </a>
            </div>
          </motion.div>

          {/* ── Right: profile card ── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate="visible"
            className="flex justify-center md:justify-end"
          >
            <motion.div
              ref={cardRef}
              animate="animate"
              variants={floatY}
              style={{
                transformStyle: "preserve-3d",
                transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                transition: "transform 0.25s ease",
              }}
              className="relative w-64 md:w-72 cursor-default select-none"
            >
              {/* Animated glow ring */}
              <motion.div
                animate={shimmerControls}
                className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-brand-400 via-indigo-400 to-pink-400 blur-lg"
              />

              {/* Card surface */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/20 dark:shadow-black/50">
                {/* ── Photo ── */}
                <div className="relative w-full aspect-[3/4] overflow-hidden">
                  <img
                    src="/martin.jpg"
                    alt="Martin Mwagambo"
                    className="w-full h-full object-cover object-top scale-105"
                    style={{
                      filter: "brightness(0.95) contrast(1.05) saturate(1.1)",
                    }}
                  />

                  {/* Gradient overlay at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Paint-stroke accent bar — echoes the artistic image style */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1.5">
                    <div className="w-1 h-6 rounded-full bg-brand-400 opacity-80" />
                    <div className="w-1 h-4 rounded-full bg-pink-400 opacity-80" />
                    <div className="w-1 h-3 rounded-full bg-yellow-300 opacity-80" />
                  </div>

                  {/* Name overlay at bottom of photo */}
                  <div className="absolute bottom-0 inset-x-0 p-5">
                    <h2 className="font-bold text-white text-lg leading-tight drop-shadow-md">
                      Martin Mwagambo
                    </h2>
                    <p className="text-brand-300 text-xs font-medium mt-0.5 drop-shadow-sm">
                      Full Stack Developer
                    </p>

                    {/* Tag pills */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {["React", "Node.js", "Firebase"].map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full text-[10px] font-semibold
                                     bg-white/15 backdrop-blur-sm text-white border border-white/25"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Short bio strip */}
                <div className="bg-white dark:bg-dark-card px-5 py-3.5 border-t border-gray-100 dark:border-dark-border">
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed text-center italic">
                    "Building clean, functional, and user-friendly
                    applications."
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-400"
        >
          <span className="text-xs font-medium tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <FiArrowDown size={16} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
