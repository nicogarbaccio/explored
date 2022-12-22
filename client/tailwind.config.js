/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    // preflight: false,
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'yellow': '#F49D37',
        'purple': '#140F2D',
        'skobeloff': '#297373',
        'queenblue': '#456990',
        'charcoal': '#294C60',
        'red': {
          100: '#EF767A',
          200: '#BA3B46'
        }
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
};