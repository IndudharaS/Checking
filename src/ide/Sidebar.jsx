import { useIDE } from './IDEContext.jsx';
import FileTree from './FileTree.jsx';

export default function Sidebar() {
  const { sidebarOpen } = useIDE();

  if (!sidebarOpen) return null;

  return (
    <div
      className="hidden md:block fixed left-12 z-40 w-60 bg-bg-elev border-r border-white/5 overflow-y-auto"
      style={{ top: 28, bottom: 22 }}
    >
      <div className="px-3 py-2 text-[11px] font-bold tracking-wide text-dim flex items-center justify-between">
        <span>EXPLORER</span>
      </div>
      <FileTree />
    </div>
  );
}
