import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1d251d',
        deep: '#223024',
        olive: '#6c775f',
        olive2: '#87917a',
        cream: '#f5f1e9',
        paper: '#fbf8f1',
        sand: '#e8e0d3',
        line: '#d8d0c3',
        muted: '#77776e',
        gold: '#b59b67',
      },
      fontFamily: {
        sans: ['var(--font-vazir)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
      },
      letterSpacing: {
        eyebrow: '0.26em',
        tight: '-0.05em',
        tighter: '-0.06em',
      },
    },
  },
  plugins: [],
};

export default config;
