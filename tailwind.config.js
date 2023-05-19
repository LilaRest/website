/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        reveal: "radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), #55ff5599, #55ff5599,  white)"
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
