import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IDEProvider, useIDE } from './ide/IDEContext.jsx';
import MenuBar from './ide/MenuBar.jsx';
import ActivityBar from './ide/ActivityBar.jsx';
import Sidebar from './ide/Sidebar.jsx';
import EditorHeader from './ide/EditorHeader.jsx';
import StatusBar from './ide/StatusBar.jsx';
import MobileBar from './ide/MobileBar.jsx';
import MobileDrawer from './ide/MobileDrawer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import SkillsPage from './pages/SkillsPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import JourneyPage from './pages/JourneyPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import { useLenis } from './lib/useLenis.js';

gsap.registerPlugin(ScrollTrigger);

function Shell() {
  const lenisRef = useLenis();
  const location = useLocation();
  const { sidebarOpen } = useIDE();

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [location.pathname, lenisRef]);

  return (
    <>
      <div className="grain" />
      <MenuBar />
      <ActivityBar />
      <Sidebar />
      <EditorHeader />
      <MobileBar />
      <MobileDrawer />
      <StatusBar />

      <main
        className={`relative min-h-screen pt-[72px] md:pt-24 pb-[22px] transition-[padding] duration-200 ${
          sidebarOpen ? 'md:pl-[288px]' : 'md:pl-12'
        }`}
      >
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/journey" element={<JourneyPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </AnimatePresence>
      </main>
    </>
  );
}

export default function App() {
  return (
    <IDEProvider>
      <Shell />
    </IDEProvider>
  );
}
