import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Laptop from '../components/Laptop.jsx';
import PageShell from '../components/PageShell.jsx';

const EXPLORE = [
  { to: '/about', label: 'About', desc: 'Who I am, what I focus on.' },
  { to: '/skills', label: 'Skills', desc: 'Languages, domains, practices.' },
  { to: '/projects', label: 'Projects', desc: 'Selected work, in detail.' },
  { to: '/journey', label: 'Journey', desc: 'Where I’ve studied and worked.' },
];

const STATS = [
  { value: '44', label: 'public repos' },
  { value: '8', label: 'languages' },
  { value: '6', label: 'skill areas' },
  { value: '2', label: 'featured platforms' },
];

export default function Home() {
  return (
    <PageShell>
      <section className="relative h-[calc(100svh-94px)] md:h-[calc(100svh-118px)] min-h-[520px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Suspense fallback={null}>
            <Laptop />
          </Suspense>
        </div>

        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_55%_at_50%_38%,rgba(7,10,9,0.55),transparent_70%)]" />

        <div className="relative h-full flex flex-col justify-end px-5 sm:px-8 lg:px-16 pb-20 sm:pb-24 pointer-events-none">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-accent text-xs sm:text-sm font-semibold tracking-[0.12em] uppercase mb-5"
          >
            Software Engineer · Paderborn, Germany
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold leading-[1.02] tracking-tight text-[clamp(2.2rem,6.5vw,4.6rem)] max-w-4xl"
          >
            Building <span className="text-gradient">clear, intelligent</span> and
            thoughtfully engineered digital products.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-dim text-base sm:text-lg max-w-xl"
          >
            I work across full-stack development, AI &amp; machine learning,
            program analysis, and interactive systems.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex gap-4 flex-wrap pointer-events-auto"
          >
            <Link
              to="/projects"
              className="px-7 py-3.5 rounded-full bg-fg text-bg text-sm font-semibold hover:bg-accent transition-colors"
            >
              View Projects
            </Link>
            <Link
              to="/contact"
              className="px-7 py-3.5 rounded-full border border-white/15 text-sm font-semibold hover:border-accent hover:bg-white/5 transition-colors"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="px-5 sm:px-8 lg:px-16 py-10 border-y border-white/8 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <p className="font-display font-bold text-2xl sm:text-3xl text-accent">{s.value}</p>
              <p className="text-faint text-xs uppercase tracking-[0.06em] mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-5 sm:px-8 lg:px-16 py-28 max-w-6xl mx-auto">
        <p className="text-comment text-xs sm:text-sm font-medium mb-4">// explore</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {EXPLORE.map((item, i) => (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to={item.to}
                className="group flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-7 py-6 hover:border-accent/40 hover:bg-white/[0.05] transition-colors"
              >
                <div>
                  <h3 className="font-display font-semibold text-lg mb-1">{item.label}</h3>
                  <p className="text-dim text-sm">{item.desc}</p>
                </div>
                <span className="text-faint group-hover:text-accent group-hover:translate-x-1 transition-all text-xl">
                  &rarr;
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
