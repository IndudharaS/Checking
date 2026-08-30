import { useIDE } from './IDEContext.jsx';
import FileTree from './FileTree.jsx';

export default function MobileDrawer() {
  const { mobileOpen, setMobileOpen } = useIDE();

  return (
    <div
      className={`md:hidden fixed inset-0 z-50 bg-bg-elev transition-transform duration-300 ease-out ${
        mobileOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between px-4 h-12 border-b border-white/5">
        <span className="text-[12px] font-bold text-dim tracking-wide">EXPLORER</span>
        <button
          aria-label="Close explorer"
          onClick={() => setMobileOpen(false)}
          className="text-dim text-2xl leading-none px-1"
        >
          ×
        </button>
      </div>
      <div className="overflow-y-auto" style={{ height: 'calc(100% - 48px)' }}>
        <FileTree onNavigate={() => setMobileOpen(false)} />
      </div>
    </div>
  );
}
