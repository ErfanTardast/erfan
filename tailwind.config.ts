import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#13251e',
        deep: '#0b1a15',
        cypress: '#21483a',
        olive: '#667658',
        olive2: '#9aa17a',
        cream: '#f3efe2',
        paper: '#fbfaf4',
        rice: '#f7f4e8',
        sand: '#ded5bd',
        line: '#cfc5aa',
        muted: '#6d6a5e',
        gold: '#b8872f',
        saffron: '#d2a537',
        clay: '#9b4d3e',
        indigo: '#274d5c',
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
