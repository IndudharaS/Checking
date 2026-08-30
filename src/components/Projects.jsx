import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RevealText from './RevealText.jsx';
import SectionLabel from './SectionLabel.jsx';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    index: '01',
    title: 'ML Milestones Lab',
    description:
      'A production-ready interactive learning platform that explores major machine learning milestones through visual experiments, animations, and browser-based simulations.',
    tags: ['TypeScript', 'AI/ML'],
    accent: '#569cd6',
    repo: 'https://github.com/indudhara59/ml-milestones-lab',
  },
  {
    index: '02',
    title: 'Medicheck AI',
    description:
      'An explainable AI-powered virtual health checkup and symptom triage platform with supervised ML, clinician review, and medication safety checks.',
    tags: ['TypeScript', 'Health Tech', 'Explainable AI'],
    accent: '#4ec9b0',
    repo: 'https://github.com/indudhara59/medicheck-ai',
  },
  {
    index: '03',
    title: 'Agentic Task Manager',
    description:
      'A beginner-friendly autonomous task management agent built with Python, covering core agentic AI concepts: tool calling, agent loops, planning, persistent state, error recovery, memory, and human approval.',
    tags: ['Python', 'Agentic AI'],
    accent: '#dcdcaa',
    repo: 'https://github.com/indudhara59/agentic-task-manager',
  },
  {
    index: '04',
    title: 'Canvasforge',
    description:
      'A collaborative, browser-based design canvas inspired by Figma — drag-and-drop shapes, text, and images on an infinite zoomable canvas.',
    tags: ['React', 'Konva', 'Node.js', 'MongoDB'],
    accent: '#569cd6',
    repo: 'https://github.com/indudhara59/canvasforge',
  },
  {
    index: '05',
    title: 'Program Analysis Toolkit',
    description:
      'A set of Java-based static analysis tools — dependency analysis, control-flow graph construction, and dataflow/call-graph experiments with Soot.',
    tags: ['Java', 'Static Analysis', 'Soot'],
    accent: '#ce9178',
    repo: 'https://github.com/indudhara59',
  },
  {
    index: '06',
    title: 'DSARP — Transformer Refactoring',
    description:
      'An architecture-refactoring recommendation system that pairs design-smell analysis with LLM-based ranking to suggest actionable refactorings.',
    tags: ['Python', 'Program Analysis', 'LLMs'],
    accent: '#4ec9b0',
    repo: 'https://github.com/indudhara59',
  },
];

function ProjectCard({ project }) {
  return (
    <article className="relative shrink-0 w-[86vw] sm:w-[62vw] lg:w-[38vw] h-[58vh] mr-6 lg:mr-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden flex flex-col justify-between p-7 sm:p-9">
      <div
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-20"
        style={{ background: project.accent }}
      />
      <div className="relative flex items-center justify-between">
        <span className="font-display text-sm text-faint">{project.index}</span>
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-faint hover:text-fg transition-colors"
        >
          view repo →
        </a>
      </div>
      <div className="relative">
        <h3 className="font-display font-bold text-[clamp(1.2rem,2.4vw,1.7rem)] tracking-tight mb-3">
          {project.title}
        </h3>
        <p className="text-dim text-sm mb-5 leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs px-3 py-1.5 rounded-full border border-white/15 text-dim">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;

      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - track.clientWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: () => `top ${window.innerWidth >= 768 ? 96 : 72}`,
          end: () => `+=${track.scrollWidth - track.clientWidth}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      return () => tween.scrollTrigger?.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative z-10 h-[calc(100vh-94px)] md:h-[calc(100vh-118px)] overflow-hidden"
    >
      <div className="px-5 sm:px-8 lg:px-16 pt-10 sm:pt-14">
        <SectionLabel>03 — ProjectsPage.jsx</SectionLabel>
        <RevealText
          as="h2"
          className="font-display font-bold tracking-tight text-[clamp(1.7rem,4.2vw,2.7rem)]"
        >
          Selected work.
        </RevealText>
        <p className="text-dim text-sm sm:text-base mt-3 max-w-xl">
          6 of 44 public projects — spanning AI, health tech, program
          analysis, and full-stack development.{' '}
          <a
            href="https://github.com/indudhara59"
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg underline decoration-white/20 hover:decoration-accent"
          >
            View all on GitHub →
          </a>
        </p>
      </div>

      <div
        ref={trackRef}
        className="flex items-center pl-5 sm:pl-8 lg:pl-16 mt-10 will-change-transform"
      >
        {PROJECTS.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
        <div className="shrink-0 w-[5vw]" />
      </div>
    </section>
  );
}
