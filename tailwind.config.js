/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        body: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        bg: '#1e1e1e',
        'bg-elev': '#252526',
        'bg-inset': '#181818',
        fg: '#d4d4d4',
        dim: '#9d9d9d',
        faint: '#6a6a6a',
        accent: '#569cd6',
        accent2: '#4ec9b0',
        comment: '#6a9955',
        string: '#ce9178',
        func: '#dcdcaa',
      },
    },
  },
  plugins: [],
};
