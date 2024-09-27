/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'one': "url('/assets/background-one.jpg')",
        'two': "url('/assets/background-two.jpg')",
        'three': "url('/assets/background-three.jpg')",
        'four': "url('/assets/background-four.jpg')",
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'sans-serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
