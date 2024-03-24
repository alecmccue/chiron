/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        seasalt: "#FAFAFA",
        isabelline: "#F4EDEA",
        sienna: "#DB6C53",
        current: "#156064",
        onyx: "#32373B"
      }
    },
    borderWidth: {
      '1': '1px',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '5': '5px',
      '6': '6px',
      '7': '7px',
      '8': '8px',
      '9': '9px',
      '10': '10px',
      '20': '20px',
      '20': '20px',
    },
  },
  plugins: [],
  important: true,
}

