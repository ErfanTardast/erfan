import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#17211a',
        deep: '#0f1712',
        cypress: '#244232',
        olive: '#60724d',
        olive2: '#8da06f',
        cream: '#f7f4e8',
        paper: '#fffdf6',
        rice: '#fbfaf2',
        sand: '#e4dcc7',
        line: '#d5ccb6',
        muted: '#6d7165',
        gold: '#c89b3c',
        saffron: '#d8a02f',
        clay: '#ad5f3e',
        indigo: '#263852',
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
