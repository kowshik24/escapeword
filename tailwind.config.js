/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          egypt: {
            primary: '#FFD700',
            secondary: '#8B4513',
          },
          space: {
            primary: '#00FFFF',
            secondary: '#000080',
          },
          haunted: {
            primary: '#8B0000',
            secondary: '#4B0082',
          },
        },
        fontFamily: {
          poppins: ['Poppins', 'sans-serif'],
          caveat: ['Caveat', 'cursive'],
        },
      },
    },
    plugins: [],
  };