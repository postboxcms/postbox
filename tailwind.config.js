/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./resources/**/*.{js,jsx,ts,tsx,blade.php}'],
  safelist: [
    { pattern: /col-span-(1|2|3|4|5|6|7|8|9|10|11|12)/, variants: ['sm', 'md', 'lg', 'xl'] },
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
