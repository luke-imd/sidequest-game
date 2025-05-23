/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dionysos: {
          winter: {
            bg: '#E3F3FF',      // Winterlicher Hintergrund
            main: '#020C8C',     // Winterliche Hauptfarbe
            grey: '#ccdbf3'
          },
          spring: {
            bg: '#3E8543',      // Frühling Hintergrund
            main: '#FEBF3E',     // Frühling Hauptfarbe
            light: '#FEDE8E'      // Hellere Variante
          },
          purple: {
            DEFAULT: '#9333EA',
            light: '#A855F7',
            dark: '#7E22CE',
          },
          gold: {
            DEFAULT: '#f6c231',
            light: '#FBBF24',
            dark: '#F59E0B',
          }
        }
      },
      backgroundColor: {
        primary: '#9333EA',
        secondary: '#FCD34D',
      },
      textColor: {
        primary: '#9333EA',
        secondary: '#FCD34D',
      },
      animation: {
         'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
         'star-movement-top': 'star-movement-top linear infinite alternate',
       },
      keyframes: {
         'star-movement-bottom': {
           '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
           '100%': { transform: 'translate(-100%, 0%)', opacity: '0' },
         },
         'star-movement-top': {
           '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
           '100%': { transform: 'translate(100%, 0%)', opacity: '0' },
         },
       },
    },
  },
  plugins: [],
}

