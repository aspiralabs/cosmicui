const cosmicPlugin = require('./plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{ts,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                jjjjj: { DEFAULT: '#FF0000', pair: '', hover: '', disabled: '' },
                stroke: { DEFAULT: '#EFEFEF', pair: '#1F2533', hover: '#dce2e6', disabled: '#ebeced' }
            }
        }
    },
    plugins: [cosmicPlugin]
};
