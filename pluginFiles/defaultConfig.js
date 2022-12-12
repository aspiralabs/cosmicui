module.exports = {
    safelist: [
        {
            pattern: /(btn|badge|progress|checkbox|radio|switch)-./,
            variants: ['hover', 'disabled', 'focus']
        },

        'fixed',
        'absolute',
        'relative',
        'h-screen',
        'w-screen',
        'z-modal-z',
        'z-drawer-z',
        'pointer-events-none', // Used for Drawer and Modal Backdrop
        'pointer-events-auto', // Used for Drawer and Modal Backdrops
        'bg-black', // Used for Modal Backdrops
        'bg-white',
        'bg-opacity-25', // Used For Modal Backdrop
        'bg-opacity-0',
        'translate-x-full',
        'translate-x-0',
        '-translate-x-full',
        '-translate-x-1/2',
        'left-1/2',
        'duration-300',
        'ease-in-out',
        'bottom-0',
        'tooltip',
        'tooltip-top',
        'tooltip-bottom',
        'tooltip-left',
        'tooltip-right'
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
            },
            transitionProperty: {
                width: 'width'
            },
            animation: {
                indeterminate: 'indeterminate 1s linear infinite',
                'modal-intro': 'modalMount 0.2s'
            },
            keyframes: {
                indeterminate: {
                    '0%': { transform: 'translateX(0) scaleX(0)' },
                    '40%': { transform: 'translateX(0) scaleX(0.4)' },
                    '100%': { transform: 'translateX(100%) scaleX(0.5)' }
                },
                modalMount: {
                    '0%': {
                        opacity: 0,
                        transform: 'translateY(50px) '
                    },
                    '100%': {
                        opacity: 1,
                        transform: 'translateY(0) '
                    }
                }
            },
            ringWidth: {
                'theme-radio-border-width': '5px'
            },
            zIndex: {
                'modal-z': '5000',
                'drawer-z': '5000'
            }
        },
        colors: {
            primary: { DEFAULT: '#3b82f6', pair: '#fafbfe', hover: '#0065FF', disabled: '#4C9AFF' },
            secondary: { DEFAULT: '#172B4D', pair: '#fafbfe', hover: '#344563', disabled: '#42526E' },
            ghost: { DEFAULT: '#ebecf0', pair: '#172B4D', hover: '#DFE1E6', disabled: '#F4F5F7' },
            error: { DEFAULT: '#fe5531', pair: '#1c2d4c', hover: '#FF7452', disabled: '#FF8F73' },
            warning: { DEFAULT: '#FF991F', pair: '#1c2d4c', hover: '#FFC400', disabled: '#FFE380' },
            success: { DEFAULT: '#7af1c0', pair: '#016946', hover: '#57D9A3', disabled: '#ABF5D1' },
            surface: { DEFAULT: '#F4F5F7', pair: '', hover: '#ebecf0', disabled: '' },
            heading: { DEFAULT: '#172B4D', pair: '', hover: '', disabled: '' },
            body: { DEFAULT: '#6B778C', pair: '', hover: '', disabled: '' },
            white: { DEFAULT: '#ffffff', pair: '', hover: '', disabled: '' },
            black: { DEFAULT: '#000000', pair: '', hover: '', disabled: '' },
            tooltip: { DEFAULT: '#3d4451', pair: '', hover: '', disabled: '' }
        }
    }
};
