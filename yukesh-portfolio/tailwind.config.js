/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#08090B',
        'bg-secondary': '#111318',
        surface: '#171A20',
        ink: '#F4F2ED',
        muted: '#999DA7',
        gold: '#C6A76A',
        border: 'rgba(244, 242, 237, 0.1)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"Space Grotesk"', 'monospace']
      },
      maxWidth: {
        content: '1400px'
      }
    }
  },
  plugins: []
}
