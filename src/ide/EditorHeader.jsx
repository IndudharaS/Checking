import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useIDE } from './IDEContext.jsx';
import FileIcon from './FileIcon.jsx';
import { ROUTES } from './tree.js';

export default function EditorHeader() {
  const { sidebarOpen } = useIDE();
  const location = useLocation();
  const active = ROUTES.find((r) => r.path === location.pathname) ?? ROUTES[0];
  const crumbs = [...active.dir.split('/'), active.file];

  const trackRef = useRef(null);
  const activeTabRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateFades = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  };

  useEffect(() => {
    updateFades();
    activeTabRef.current?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
    const onResize = () => updateFades();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [location.pathname, sidebarOpen]);

  const handleWheel = (e) => {
    const el = trackRef.current;
    if (!el) return;
    const overflowing = el.scrollWidth > el.clientWidth;
    if (overflowing && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      el.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  };

  return (
    <div
      className={`fixed top-7 right-0 z-40 hidden md:block bg-bg-elev border-b border-white/5 ${
        sidebarOpen ? 'md:left-[288px]' : 'md:left-12'
      }`}
    >
      <div className="relative">
        <div
          ref={trackRef}
          onScroll={updateFades}
          onWheel={handleWheel}
          className="flex h-10 overflow-x-auto scrollbar-none"
        >
          {ROUTES.map((r) => {
            const isActive = r.path === location.pathname;
            return (
              <NavLink
                key={r.path}
                ref={isActive ? activeTabRef : null}
                to={r.path}
                className={`group relative flex items-center gap-2 px-3 h-full border-r border-white/5 text-[13px] shrink-0 transition-colors ${
                  isActive ? 'bg-bg text-fg' : 'bg-bg-elev text-dim hover:text-fg'
                }`}
              >
                {isActive && <span className="absolute left-0 right-0 top-0 h-[2px] bg-accent" />}
                <FileIcon name={r.file} />
                {r.file}
                <span className="ml-1 text-faint opacity-0 group-hover:opacity-100 text-[11px] transition-opacity">
                  ✕
                </span>
              </NavLink>
            );
          })}
        </div>
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-bg-elev to-transparent transition-opacity duration-200"
          style={{ opacity: canScrollLeft ? 1 : 0 }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-bg-elev to-transparent transition-opacity duration-200"
          style={{ opacity: canScrollRight ? 1 : 0 }}
        />
      </div>
      <div className="h-7 flex items-center px-3 text-[12px] text-faint gap-1.5">
        {crumbs.map((c, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="opacity-40">›</span>}
            <span className={i === crumbs.length - 1 ? 'text-dim' : ''}>{c}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
