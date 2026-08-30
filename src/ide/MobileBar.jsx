import { useLocation } from 'react-router-dom';
import { useIDE } from './IDEContext.jsx';
import FileIcon from './FileIcon.jsx';
import { ROUTES } from './tree.js';

export default function MobileBar() {
  const { setMobileOpen } = useIDE();
  const location = useLocation();
  const active = ROUTES.find((r) => r.path === location.pathname) ?? ROUTES[0];

  return (
    <div className="md:hidden fixed top-7 left-0 right-0 z-40 h-11 bg-bg-elev border-b border-white/5 flex items-center justify-between px-4">
      <div className="flex items-center gap-2 text-[13px] text-fg">
        <FileIcon name={active.file} />
        {active.file}
      </div>
      <button
        aria-label="Open explorer"
        onClick={() => setMobileOpen(true)}
        className="text-dim text-base leading-none px-1 flex flex-col gap-[3px]"
      >
        <span className="w-5 h-px bg-dim" />
        <span className="w-5 h-px bg-dim" />
        <span className="w-5 h-px bg-dim" />
      </button>
    </div>
  );
}
