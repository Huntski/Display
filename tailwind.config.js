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
      },
      boxShadow: {
        '3xl': '0 0 60px -15px rgba(0, 0, 0, 0.3)',
      },
      rotate: {
        '135': '135deg',
      },
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
      rotate: ['group-hover']
    }
  },
}
