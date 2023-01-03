module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'regular-normal': '#323648',
        'regular-lighter': '#464b67',
        'tabs-blue': '#141414',
        'primary-gold': '#B19017',
        'primary-gold-bright': '#d3ab16',
        'transparent': '#ffffff00',
        'dark-transparent': 'rgba(0,0,0,0.53)',
        'light-transparent': 'rgba(255,255,255,0.27)',
        'controls': '#000',
        'primary-dark-menu': '#141414',
      },
      boxShadow: {
        '3xl': '0 0 60px -15px rgba(0, 0, 0, 0.3)',
      },
      rotate: {
        '135': '135deg',
      },
      borderWidth: {
        '5': '5px'
      },
      zIndex: {
        '60': '60'
      },
      cursor: {
        'hide': 'none'
      }
    },
    fontFamily: {
      'primary': ['Nunito', 'sans-serif'],
      'jap': ['Kyokasho', 'sans-serif']
    },
  },
  plugins: [],
  variants: {
    extend: {
      backgroundColor: ['active'],
      borderColor: ['active'],
      borderWidth: ['active'],
      rotate: ['group-hover'],
      scale: ['group-hover'],
      visible: ['group-hover']
    }
  },
}
