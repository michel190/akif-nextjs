/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        red: { DEFAULT: '#E31E27', deep: '#A5151C' },
        flame: '#F5A623',
        navy: '#1B2A5B',
        bg: '#FAF8F5',
        panel: '#FFFFFF',
        panel2: '#F3F1EC',
        line: 'rgba(20,15,10,0.10)',
        bone: '#221D18',
        mut: '#8A8178',
        ink: '#141010',
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
