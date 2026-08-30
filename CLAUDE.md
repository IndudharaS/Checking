# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A multi-page personal portfolio (`indudhara-portfolio-3d`) built around a procedurally-modeled 3D laptop (React Three Fiber) on the home page — an opening-hinge animation revealing a glowing "code editor" screen — plus GSAP-driven scroll interactions (a pinned horizontal project gallery) and Framer Motion page transitions and reveals throughout. The whole site chrome is themed as a VS Code-style IDE (menu bar, activity bar, file tree sidebar, status bar) wrapping the actual page content.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start Vite dev server
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

There is no test suite or linter configured in this repo.

## Stack

- Vite + React 18 — app shell, no TypeScript (plain `.jsx`)
- React Router (`BrowserRouter`) — client-side routing across Home / About / Skills / Projects / Journey / Contact
- React Three Fiber + drei + `@react-three/postprocessing` — the 3D laptop scene
- GSAP (`ScrollTrigger`) — pinned horizontal scroll on the Projects page
- Lenis — smooth inertia scrolling, synced to GSAP's ticker
- Framer Motion — page transitions and scroll reveals
- Tailwind CSS — styling; color tokens defined in `tailwind.config.js` follow a VS Code dark-theme palette (`bg`, `bg-elev`, `accent` = `#569cd6` blue, `accent2` = `#4ec9b0` teal, `comment`, `string`, `func`, etc.)

## Architecture

**Two-layer UI: "IDE chrome" + routed pages.** `src/App.jsx` renders a persistent IDE-styled shell (`src/ide/`: `MenuBar`, `ActivityBar`, `Sidebar`, `EditorHeader`, `StatusBar`, plus `MobileBar`/`MobileDrawer` for small screens) around a `<main>` that swaps `src/pages/*` content via `react-router-dom`, wrapped in Framer Motion's `AnimatePresence`. `src/ide/IDEContext.jsx` is a small context provider (`sidebarOpen`, `mobileOpen`) consumed by the shell components to sync sidebar state with the `<main>` padding.

**The file tree is fake but mirrors the real repo.** `src/ide/tree.js` hardcodes `FILE_TREE` (the sidebar's file explorer) and `ROUTES` (path → filename mapping used to highlight the "active file" as if navigating pages were opening files in an editor). When adding, renaming, or removing a page/component, update `tree.js` to keep the IDE illusion in sync with the actual source tree.

**Scroll stack.** `src/lib/useLenis.js` creates a Lenis instance driven by GSAP's ticker (not `requestAnimationFrame` directly) and forwards scroll events to `ScrollTrigger.update`. `Shell` in `App.jsx` resets Lenis scroll position and calls `ScrollTrigger.refresh()` on every route change (via `useLocation().pathname`), which any page relying on `ScrollTrigger` (e.g. the pinned gallery on `ProjectsPage`) depends on to recalculate pin/trigger positions after navigation.

**The 3D laptop (`src/components/Laptop.jsx`).** Procedurally builds the laptop geometry in Three.js/R3F (no GLTF model), including a hinge-opening animation driven by GSAP, and paints the "screen" by drawing syntax-highlighted fake code (`CODE_LINES`) onto an offscreen `<canvas>` that's used as a texture (`createScreenTexture`). Scene lighting/post uses `Environment`, `ContactShadows`, and `EffectComposer` (`Bloom`, `Vignette`) from drei/postprocessing. It degrades effects based on `isSmallScreen` for mobile performance.

**Page transitions.** `src/components/PageShell.jsx` is the shared fade/slide wrapper every page in `src/pages/` uses as its root element so `AnimatePresence` in `App.jsx` can animate route changes consistently.
