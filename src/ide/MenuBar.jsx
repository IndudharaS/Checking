const MENU_ITEMS = ['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help'];

export default function MenuBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-7 bg-bg-inset border-b border-white/5 flex items-center px-3 text-[12px] text-dim select-none">
      <div className="flex items-center gap-1.5 mr-4 shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
      </div>
      <div className="hidden md:flex items-center gap-4 shrink-0">
        {MENU_ITEMS.map((m) => (
          <span key={m} className="hover:text-fg cursor-default transition-colors">
            {m}
          </span>
        ))}
      </div>
      <div className="flex-1 text-center text-faint text-[11px] truncate px-2">
        portfolio — Visual Studio Code
      </div>
      <div className="w-16 shrink-0" />
    </div>
  );
}
