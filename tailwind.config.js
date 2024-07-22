/** @type {import('tailwindcss').Config} */

const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content()
  ],
  theme: {
    extend: {},
    colors:{
      'purple': '#3f3cbb'},
  },
  plugins: [
    flowbite.plugin()
  ],
  
}
