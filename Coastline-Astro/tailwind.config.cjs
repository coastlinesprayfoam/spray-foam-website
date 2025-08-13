/***********************************************************
 * Tailwind Config (base) - extend design tokens later
 ***********************************************************/
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0d5c63',
          accent: '#f59e0b',
          dark: '#083b40'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
