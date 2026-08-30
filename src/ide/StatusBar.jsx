import { useLocation } from 'react-router-dom';
import { ROUTES } from './tree.js';

export default function StatusBar() {
  const location = useLocation();
  const active = ROUTES.find((r) => r.path === location.pathname) ?? ROUTES[0];
  const ext = active.file.split('.').pop().toUpperCase();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-[22px] bg-[#007acc] text-white flex items-center justify-between px-3 text-[11px] font-medium select-none">
      <div className="flex items-center gap-4">
        <span>main</span>
        <span className="hidden sm:inline">✓ 0 ⚠ 0</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="hidden sm:inline">Ln 1, Col 1</span>
        <span className="hidden sm:inline">UTF-8</span>
        <span>{ext}</span>
        <span className="hidden md:inline">Prettier</span>
      </div>
    </div>
  );
}
