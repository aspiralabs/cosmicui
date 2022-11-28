const cosmicPlugin = require('./plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{ts,tsx,mdx}'],
    plugins: [cosmicPlugin]
};
