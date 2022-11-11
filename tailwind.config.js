/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{ts,tsx}'],
    safelist: [
        {
            pattern: /(bg|text|border|fill)-./,
            variants: ['hover', 'disabled', 'focus']
        }
    ],
    theme: {
        extend: {
            borderRadius: {
                'theme-button': '0.25rem',
                'theme-input': '0.25rem'
            },
            fontSize: {
                'theme-input-description': '0.7rem',
                'theme-input-label': '0.8rem'
            }
        },
        colors: {
            primary: { DEFAULT: '#0052CC', pair: '#fafbfe', hover: '#0065FF', disabled: '#4C9AFF' },
            secondary: { DEFAULT: '#172B4D', pair: '#fafbfe', hover: '#344563', disabled: '#42526E' },
            purple: { DEFAULT: '#6554c0', pair: '#fafbfe', hover: '#8777D9', disabled: '#998DD9' },
            ghost: { DEFAULT: '#ebecf0', pair: '#172B4D', hover: '#DFE1E6', disabled: '#F4F5F7' },
            error: { DEFAULT: '#fe5531', pair: '#1c2d4c', hover: '#FF7452', disabled: '#FF8F73' },
            warning: { DEFAULT: '#FF991F', pair: '#1c2d4c', hover: '#FFC400', disabled: '#FFE380' },
            success: { DEFAULT: '#7af1c0', pair: '#016946', hover: '#57D9A3', disabled: '#ABF5D1' },
            surface: { DEFAULT: '#F4F5F7', hover: '#ebecf0' },
            heading: { DEFAULT: '#172B4D' },
            body: { DEFAULT: '#6B778C' },
            white: { DEFAULT: '#ffffff' },
            black: { DEFAULT: '#000000' }
        }
    },
    plugins: []
};
