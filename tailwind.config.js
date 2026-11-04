const themed = (name) => `rgb(var(--${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // these change with light / dark mode (see index.css)
        bg: themed('bg'),
        surface: themed('surface'),
        ink: themed('ink'),
        muted: themed('muted'),
        line: themed('line'),
        brand: themed('brand'),
        'brand-ink': themed('brand-ink'),
        accent: themed('accent'),
        // fixed palette from the reference image
       midnight: '#001D2C',
navy: '#003049',
steel: '#669BBC',
maroon: '#780000',
crimson: '#C1121F',
sand: '#FDF0D5',
cream: '#FDF0D5',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        rise: {
          from: { opacity: 0, transform: 'translateY(18px)' },
          to: { opacity: 1, transform: 'none' },
        },
        pop: {
          from: { opacity: 0, transform: 'scale(.95) translateY(8px)' },
          to: { opacity: 1, transform: 'none' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        rise: 'rise .9s cubic-bezier(.2,.7,.2,1) both',
        pop: 'pop .35s cubic-bezier(.2,.7,.2,1) both',
        float: 'float 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
