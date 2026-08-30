import { useIDE } from './IDEContext.jsx';

function Icon({ type }) {
  const common = {
    width: 21,
    height: 21,
    viewBox: '0 0 22 22',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.4,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };
  switch (type) {
    case 'explorer':
      return (
        <svg {...common}>
          <rect x="4" y="3" width="10" height="13" rx="1" />
          <rect x="8.2" y="6.4" width="10" height="13" rx="1" fill="#1e1e1e" />
        </svg>
      );
    case 'search':
      return (
        <svg {...common}>
          <circle cx="9" cy="9" r="6" />
          <line x1="14" y1="14" x2="19" y2="19" />
        </svg>
      );
    case 'git':
      return (
        <svg {...common}>
          <circle cx="6" cy="5" r="2" />
          <circle cx="6" cy="17" r="2" />
          <circle cx="16" cy="11" r="2" />
          <path d="M6 7 V15" />
          <path d="M6 9 C6 11 10 11 14 11" />
        </svg>
      );
    case 'debug':
      return (
        <svg {...common}>
          <path d="M6 3 L18 11 L6 19 Z" />
        </svg>
      );
    case 'extensions':
      return (
        <svg {...common}>
          <rect x="4" y="4" width="14" height="14" rx="2" />
          <circle cx="18.2" cy="11" r="2.1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'account':
      return (
        <svg {...common}>
          <circle cx="11" cy="8" r="3.2" />
          <path d="M4.5 19c1.2-4 4-6 6.5-6s5.3 2 6.5 6" />
        </svg>
      );
    case 'settings':
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="3" />
          <path d="M11 3v2.2M11 17.8V20M3 11h2.2M17.8 11H20M5.5 5.5l1.6 1.6M14.9 14.9l1.6 1.6M5.5 16.5l1.6-1.6M14.9 7.1l1.6-1.6" />
        </svg>
      );
    default:
      return null;
  }
}

const TOP_ICONS = [
  { key: 'explorer', label: 'Explorer' },
  { key: 'search', label: 'Search' },
  { key: 'git', label: 'Source Control' },
  { key: 'debug', label: 'Run and Debug' },
  { key: 'extensions', label: 'Extensions' },
];

const BOTTOM_ICONS = [
  { key: 'account', label: 'Accounts' },
  { key: 'settings', label: 'Settings' },
];

export default function ActivityBar() {
  const { sidebarOpen, setSidebarOpen } = useIDE();

  return (
    <div
      className="hidden md:flex flex-col items-center justify-between w-12 bg-bg-inset border-r border-white/5 py-1 fixed left-0 z-40"
      style={{ top: 28, bottom: 22 }}
    >
      <div className="flex flex-col items-center">
        {TOP_ICONS.map(({ key, label }) => {
          const active = key === 'explorer' && sidebarOpen;
          return (
            <button
              key={key}
              title={label}
              onClick={() => key === 'explorer' && setSidebarOpen((o) => !o)}
              className={`relative w-12 h-11 flex items-center justify-center transition-colors ${
                active ? 'text-fg' : 'text-faint hover:text-dim'
              }`}
            >
              {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-[2px] bg-fg" />}
              <Icon type={key} />
            </button>
          );
        })}
      </div>
      <div className="flex flex-col items-center">
        {BOTTOM_ICONS.map(({ key, label }) => (
          <button
            key={key}
            title={label}
            className="w-12 h-11 flex items-center justify-center text-faint hover:text-dim transition-colors"
          >
            <Icon type={key} />
          </button>
        ))}
      </div>
    </div>
  );
}
