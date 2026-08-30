# Indudhara — 3D Portfolio

A multi-page personal portfolio built around a procedurally-modeled 3D
laptop (React Three Fiber) on the home page — an opening-hinge animation
revealing a glowing "code editor" screen — plus GSAP-driven scroll
interactions (a pinned horizontal project gallery) and Framer Motion page
transitions and reveals throughout.

## Stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) — app shell
- [React Router](https://reactrouter.com/) — client-side routing (Home / About / Skills / Projects / Journey / Contact)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + [drei](https://github.com/pmndrs/drei) + [postprocessing](https://github.com/pmndrs/react-postprocessing) — the 3D laptop scene
- [GSAP](https://gsap.com/) (ScrollTrigger) — pinned horizontal scroll on the Projects page
- [Lenis](https://lenis.darkroom.engineering/) — smooth inertia scrolling
- [Framer Motion](https://www.framer.com/motion/) — page transitions, scroll reveals
- [Tailwind CSS](https://tailwindcss.com/) — styling (emerald/teal-on-dark theme)

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

Outputs a static `dist/` folder, deployable as-is to Vercel, Netlify, GitHub
Pages, etc.

## Structure

- [src/pages/](src/pages/) — one file per route (`Home`, `About`, `SkillsPage`, `ProjectsPage`, `JourneyPage`, `ContactPage`)
- [src/components/Laptop.jsx](src/components/Laptop.jsx) — the procedural 3D laptop (hinge animation, canvas-textured screen, lighting, bloom)
- [src/components/Nav.jsx](src/components/Nav.jsx) — routed nav with active-link state and mobile drawer
- [src/components/PageShell.jsx](src/components/PageShell.jsx) — shared page enter/exit transition
- [src/lib/useLenis.js](src/lib/useLenis.js) — Lenis + GSAP ScrollTrigger sync
- [tailwind.config.js](tailwind.config.js) — color tokens (`accent` = emerald, `accent2` = teal)
Simply manually chcking which github account it is. 