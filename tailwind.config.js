module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'regular-blue': '#323648',
        'tabs-blue': '#272A37',
        'primary-gold': '#B19017',
        'primary-gold-bright': '#d3ab16'
      },
      boxShadow: {
        '3xl': '0 0 60px -15px rgba(0, 0, 0, 0.3)',
      },
      rotate: {
        '135': '135deg',
      },
    },
    fontFamily: {
      'raleway': ['Kodchasan', 'Open Sans']
    },
  },
  plugins: [],
}
