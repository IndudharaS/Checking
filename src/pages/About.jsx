import { motion } from 'framer-motion';
import PageShell from '../components/PageShell.jsx';
import RevealText from '../components/RevealText.jsx';
import SectionLabel from '../components/SectionLabel.jsx';

const FACTS = [
  { label: 'Location', value: 'Germany · CET' },
  { label: 'Currently', value: 'M.Sc. Student, Paderborn University' },
  { label: 'Focus', value: 'Full-stack · AI/ML · Program Analysis' },
  { label: 'Public repos', value: '44 repositories · 8 languages' },
  { label: 'Status', value: 'Open to opportunities & collaborations' },
];

const PILLARS = [
  {
    tag: 'build',
    title: 'Build',
    desc: 'Creating practical, production-ready full-stack products.',
  },
  {
    tag: 'experiment',
    title: 'Experiment',
    desc: 'Exploring AI and interactive systems through hands-on prototypes.',
  },
  {
    tag: 'understand',
    title: 'Understand',
    desc: 'Analyzing and visualizing complex software through program analysis.',
  },
  {
    tag: 'share',
    title: 'Share',
    desc: 'Publishing projects, research, and what I learn along the way.',
  },
];

const INTERESTS = [
  'Machine Learning',
  'Health Technology',
  'Developer Tools',
  'Cybersecurity',
  'Program Analysis',
  'Experimental Interfaces',
];

export default function About() {
  return (
    <PageShell className="px-5 sm:px-8 lg:px-16 pt-10 sm:pt-14 pb-24 max-w-5xl mx-auto">
      <SectionLabel>01 — About.jsx</SectionLabel>
      <RevealText
        as="h1"
        className="font-display font-bold tracking-tight text-[clamp(1.9rem,5vw,3.2rem)] mb-14 max-w-3xl"
      >
        Engineering with curiosity and intent.
      </RevealText>

      <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr] mb-20">
        <div className="flex flex-col gap-5 text-dim text-base sm:text-lg leading-relaxed">
          <p>
            I build intelligent, interactive, and visually engaging software.
            My work spans <strong className="text-fg font-semibold">AI</strong>,{' '}
            <strong className="text-fg font-semibold">full-stack development</strong>,{' '}
            <strong className="text-fg font-semibold">program analysis</strong>, and{' '}
            <strong className="text-fg font-semibold">health technology</strong> —
            turning intricate technical concepts into understandable, usable
            products that merge solid engineering with thoughtful interaction
            design.
          </p>
          <p>
            I'm currently pursuing a Master's degree at{' '}
            <strong className="text-fg font-semibold">Paderborn University</strong>{' '}
            (since Winter 2025), based in Germany (CET).
          </p>
        </div>

        <ul className="flex flex-col gap-6 border-l border-white/10 pl-6 h-fit">
          {FACTS.map((fact) => (
            <li key={fact.label}>
              <span className="block text-xs uppercase tracking-[0.06em] text-faint mb-1">
                {fact.label}
              </span>
              <span className="text-fg text-sm sm:text-base">{fact.value}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-comment text-xs sm:text-sm font-medium mb-6">// how I approach work</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-20">
        {PILLARS.map((p, i) => (
          <motion.div
            key={p.tag}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-lg border border-white/8 bg-white/[0.03] p-6"
          >
            <p className="text-accent text-sm mb-2">{p.tag}()</p>
            <h3 className="font-display font-semibold text-lg mb-2">{p.title}</h3>
            <p className="text-dim text-sm leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>

      <p className="text-comment text-xs sm:text-sm font-medium mb-5">// areas of interest</p>
      <div className="flex flex-wrap gap-2">
        {INTERESTS.map((interest) => (
          <span
            key={interest}
            className="text-sm px-4 py-2 rounded-md border border-white/10 text-dim bg-white/[0.02]"
          >
            {interest}
          </span>
        ))}
      </div>
    </PageShell>
  );
}
