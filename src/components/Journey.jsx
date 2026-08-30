import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import RevealText from './RevealText.jsx';
import SectionLabel from './SectionLabel.jsx';

const MILESTONES = [
  {
    date: 'Winter 2025 — Present',
    title: 'M.Sc. Student',
    org: 'Paderborn University, Germany',
    desc: 'Developing my interests across software engineering, AI, and program analysis. Based in-country, CET timezone.',
    current: true,
  },
  {
    date: 'Completed prior to 2025',
    title: 'B.E., Computer Science & Engineering',
    org: 'Visvesvaraya Technological University',
    desc: 'First Class with Distinction — CGPA 9.47.',
    current: false,
  },
];

export default function Journey() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 60%'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="journey" className="relative z-10 px-5 sm:px-8 lg:px-16 pt-10 sm:pt-14 pb-28 max-w-4xl mx-auto">
      <SectionLabel>04 — JourneyPage.jsx</SectionLabel>
      <RevealText
        as="h2"
        className="font-display font-bold tracking-tight text-[clamp(1.7rem,4.2vw,2.7rem)] mb-6"
      >
        Where I've been.
      </RevealText>
      <p className="text-dim text-sm sm:text-base leading-relaxed max-w-2xl mb-16">
        From foundational engineering knowledge into full-stack development,
        machine learning, data science, health technology, cybersecurity, and
        program analysis — built through cross-disciplinary exploration and
        public project work.
      </p>

      <div ref={containerRef} className="relative pl-10">
        <div className="absolute left-0 top-1 bottom-1 w-px bg-white/10" />
        <motion.div
          className="absolute left-0 top-1 w-px bg-accent origin-top"
          style={{ scaleY: lineScale, height: 'calc(100% - 8px)' }}
        />

        <div className="flex flex-col gap-14">
          {MILESTONES.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <span
                className={`absolute -left-[42px] top-1.5 w-2.5 h-2.5 rounded-full ${
                  m.current ? 'bg-accent shadow-[0_0_0_4px_rgba(86,156,214,0.18)]' : 'bg-faint'
                }`}
              />
              <p className="text-xs text-faint uppercase tracking-[0.08em] mb-2">{m.date}</p>
              <h3 className="font-display font-semibold text-xl sm:text-2xl mb-1">{m.title}</h3>
              <p className="text-sm text-dim mb-2">{m.org}</p>
              <p className="text-dim text-sm sm:text-base max-w-md">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <p className="text-comment text-xs sm:text-sm font-medium mt-16">
        // currently open to engineering opportunities, research ideas, and
        collaborations where careful implementation and thoughtful
        interaction matter.
      </p>
    </section>
  );
}
