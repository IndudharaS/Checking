import { motion } from 'framer-motion';
import RevealText from './RevealText.jsx';
import SectionLabel from './SectionLabel.jsx';

const LINKS = [
  { label: 'Email', value: 'indudhara59@gmail.com', href: 'mailto:indudhara59@gmail.com' },
  {
    label: 'GitHub',
    value: 'github.com/indudhara59',
    href: 'https://github.com/indudhara59',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/indudhara-s',
    href: 'https://linkedin.com/in/indudhara-s-5b35262a8',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative z-10 px-5 sm:px-8 lg:px-16 pt-10 sm:pt-14 pb-28 max-w-5xl mx-auto">
      <SectionLabel>05 — ContactPage.jsx</SectionLabel>
      <RevealText
        as="h2"
        className="font-display font-bold tracking-tight text-[clamp(2rem,6vw,3.6rem)] mb-6"
      >
        Let's build something.
      </RevealText>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-dim text-base sm:text-lg max-w-lg mb-14"
      >
        Open to engineering opportunities, research ideas, and
        collaborations where careful implementation and thoughtful
        interaction matter.
      </motion.p>

      <div className="rounded-2xl border border-white/10 overflow-hidden divide-y divide-white/10 bg-bg-elev/60 backdrop-blur-sm">
        {LINKS.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-between px-6 sm:px-8 py-6 hover:bg-accent/[0.06] hover:pl-10 sm:hover:pl-12 transition-[background,padding] duration-300 group"
          >
            <span className="text-xs uppercase tracking-[0.08em] text-faint">{link.label}</span>
            <span className="font-display text-base sm:text-lg font-medium group-hover:text-accent transition-colors">
              {link.value}
            </span>
          </motion.a>
        ))}
      </div>

      <footer className="mt-20 text-center text-faint text-xs">
        &copy; 2026 Indudhara. Built with React Three Fiber &amp; GSAP.
      </footer>
    </section>
  );
}
