module.exports = {
  purge: [
    './components/**/*.js',
    './pages/**/*.js',
    './lib/utils/**/*.js',
    './node_modules/tailwindcss-dark-mode/prefers-dark.js'
  ],
  theme: {
    darkSelector: '.dark',
    extend: {
      spacing: {
        28: '7rem'
      },
      maxWidth: {
        760: '760px'
      },
      letterSpacing: {
        tighter: '-.04em'
      },
      lineHeight: {
        tight: 1.2
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem'
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)'
      }
    }
  },
  variants: {
    backgroundColor: ['dark', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd'],
    borderColor: ['dark', 'dark-disabled', 'dark-focus', 'dark-focus-within'],
    textColor: ['dark', 'dark-hover', 'dark-active', 'dark-placeholder']
  },
  plugins: [require('tailwindcss-dark-mode')()]
}
