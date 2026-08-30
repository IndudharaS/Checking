import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FileIcon from './FileIcon.jsx';
import { FILE_TREE } from './tree.js';

function Row({ node, depth, onNavigate }) {
  const [open, setOpen] = useState(node.open ?? false);
  const location = useLocation();

  if (node.type === 'folder') {
    return (
      <div>
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center gap-1.5 py-[3px] text-[13px] text-dim hover:bg-white/[0.06] transition-colors"
          style={{ paddingLeft: 8 + depth * 14, paddingRight: 8 }}
        >
          <span
            className={`inline-block w-2.5 text-[9px] text-faint shrink-0 transition-transform duration-150 ${
              open ? 'rotate-90' : ''
            }`}
          >
            ▶
          </span>
          <span style={{ color: '#c9a26d' }}>{node.name}</span>
        </button>
        {open &&
          node.children.map((child) => (
            <Row key={child.name} node={child} depth={depth + 1} onNavigate={onNavigate} />
          ))}
      </div>
    );
  }

  const isActive = node.path && location.pathname === node.path;
  const inner = (
    <span
      className="flex items-center gap-2 py-[3px] text-[13px]"
      style={{ paddingLeft: 8 + depth * 14 + 14, paddingRight: 8 }}
    >
      <FileIcon name={node.name} />
      <span className={isActive ? 'text-fg' : node.path ? 'text-dim' : 'text-faint'}>{node.name}</span>
    </span>
  );

  if (node.path) {
    return (
      <Link
        to={node.path}
        onClick={onNavigate}
        className={`block hover:bg-white/[0.06] transition-colors ${isActive ? 'bg-white/[0.08]' : ''}`}
      >
        {inner}
      </Link>
    );
  }

  return <div className="cursor-default opacity-70">{inner}</div>;
}

export default function FileTree({ onNavigate }) {
  return (
    <div className="py-2">
      <div className="px-2 py-1 text-[11px] font-bold tracking-wide text-fg/80 uppercase">
        {FILE_TREE.name}
      </div>
      {FILE_TREE.children.map((child) => (
        <Row key={child.name} node={child} depth={0} onNavigate={onNavigate} />
      ))}
    </div>
  );
}
