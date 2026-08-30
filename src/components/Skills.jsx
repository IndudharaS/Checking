import { useRef } from 'react';
import { motion } from 'framer-motion';
import RevealText from './RevealText.jsx';
import SectionLabel from './SectionLabel.jsx';

const GROUPS = [
  {
    num: '01',
    title: 'Languages',
    color: '#569cd6',
    tags: ['TypeScript', 'JavaScript', 'Python', 'Java', 'R', 'SQL', 'HTML', 'CSS'],
  },
  {
    num: '02',
    title: 'Frontend',
    color: '#9cdcfe',
    tags: [
      'React',
      'Next.js',
      'Tailwind CSS',
      'Framer Motion',
      'Three.js',
      'React Three Fiber',
      'Responsive Design',
      'Data Visualization',
    ],
  },
  {
    num: '03',
    title: 'Backend & Data',
    color: '#dcdcaa',
    tags: [
      'Node.js',
      'REST APIs',
      'Supabase',
      'PostgreSQL',
      'MongoDB',
      'Authentication',
      'Serverless Functions',
    ],
  },
  {
    num: '04',
    title: 'AI & Data Science',
    color: '#4ec9b0',
    tags: [
      'Supervised ML',
      'Unsupervised Learning',
      'Transformers',
      'RAG',
      'Explainable AI',
      'Data Analysis',
      'Model Evaluation',
      'Health AI',
    ],
  },
  {
    num: '05',
    title: 'Software Engineering',
    color: '#ce9178',
    tags: [
      'Program Analysis',
      'Static Analysis',
      'Control-Flow Graphs',
      'Dependency Analysis',
      'Refactoring',
      'Git',
      'GitHub',
      'Testing',
    ],
  },
  {
    num: '06',
    title: 'Additional Interests',
    color: '#6a9955',
    tags: ['Cybersecurity', 'Flutter', 'Interactive Learning', 'Developer Tools', 'Healthcare Technology'],
  },
];

function TiltCard({ children, accent }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(700px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-3px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="h-full rounded-lg border border-white/8 bg-white/[0.03] p-6 transition-[border-color,background] duration-300 hover:bg-white/[0.05] will-change-transform"
      style={{
        transition: 'transform 0.15s ease-out, border-color 0.3s, background 0.3s',
        borderTopColor: accent,
        borderTopWidth: '2px',
      }}
    >
      {children}
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative z-10 px-5 sm:px-8 lg:px-16 pt-10 sm:pt-14 pb-28 max-w-6xl mx-auto">
      <SectionLabel>02 — SkillsPage.jsx</SectionLabel>
      <RevealText
        as="h2"
        className="font-display font-bold tracking-tight text-[clamp(1.7rem,4.2vw,2.7rem)] mb-3"
      >
        A toolkit for building and understanding software.
      </RevealText>
      <p className="text-dim text-sm sm:text-base mb-14 max-w-2xl">
        Spanning product engineering, intelligent systems, data, and program
        analysis.
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {GROUPS.map((group, gi) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: gi * 0.07 }}
          >
            <TiltCard accent={group.color}>
              <div className="flex items-baseline gap-2 mb-5">
                <span className="text-faint text-xs font-medium">{group.num}</span>
                <h3 className="font-display font-semibold text-base">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1.5 rounded border"
                    style={{
                      color: group.color,
                      borderColor: `${group.color}33`,
                      background: `${group.color}0d`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
