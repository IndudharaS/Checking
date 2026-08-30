const EXT_MAP = {
  jsx: { color: '#4fc1ff', label: 'JS' },
  js: { color: '#f0db4f', label: 'JS' },
  css: { color: '#42a5f5', label: '#' },
  json: { color: '#cbcb41', label: '{}' },
  md: { color: '#519aba', label: 'M' },
  html: { color: '#e37933', label: '<>' },
};

export function getFileIcon(name) {
  const ext = name.split('.').pop();
  return EXT_MAP[ext] || { color: '#8a8a8a', label: '•' };
}

export default function FileIcon({ name, size = 14 }) {
  const { color, label } = getFileIcon(name);
  return (
    <span
      className="inline-flex items-center justify-center shrink-0 font-bold leading-none"
      style={{ width: size + 4, fontSize: size * 0.62, color }}
    >
      {label}
    </span>
  );
}
