const generateInputClasses = (theme, variants) => {
    const baseInputClass = `bg-surface px-4 h-10 rounded-theme-input text-sm text-body outline-primary relative flex items-center`;
    const baseCheckboxClass = `h-5 w-5 cursor-pointer appearance-none bg-ghost rounded-theme-input transition-colors`;
    const baseRadioClass = `h-5 w-5 cursor-pointer appearance-none bg-ghost rounded-full transition-colors`;
    const baseSwitchClass = `h-4 w-12 cursor-pointer appearance-none bg-ghost rounded-full transition-colors`;
    const baseSwitchToggleClass = `content-[''] h-6 w-6 bg-white shadow absolute rounded-full -top-1 left-0 transform transition-transform translate-x-0`;

    // =========================================================================
    // INPUTS
    // =========================================================================
    let inputs = {
        '.input': {
            [`@apply ${baseInputClass}`]: {}
        },
        '.input:hover': {
            [`@apply bg-surface-hover`]: {}
        },
        '.input:focus': {
            [`@apply bg-surface-hover`]: {}
        },
        '.input:disabled': {
            [`@apply text-opacity-50 cursor-not-allowed bg-opacity-75`]: {}
        },
        '.input:disabled:hover': {
            [`@apply bg-surface bg-opacity-75`]: {}
        },
        '.input::placeholder': {
            [`@apply text-body text-opacity-50`]: {}
        },
        '.select': {
            background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' height='16' width='16'%3E%3Cpath fill-rule='evenodd' d='M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z' clip-rule='evenodd'/%3E%3C/svg%3E") no-repeat`,
            backgroundPosition: `calc(100% - 0.75rem) center !important`,
            [`@apply input appearance-none bg-surface fill-surface stroke-2`]: {}
        },
        '.textarea': {
            [`@apply input py-2 h-auto`]: {}
        }
    };

    // =========================================================================
    // CHECKBOXES
    // =========================================================================
    let checkbox = {};
    // Generate Variants
    variants.forEach(variant => {
        const checkColor = theme(`colors.${variant}.pair`).replace('#', '%23');

        // Base Varirant
        checkbox[`.checkbox-${variant}`] = {
            [`@apply ${baseCheckboxClass}`]: {}
        };

        // Hover Variant
        checkbox[`.checkbox-${variant}:checked`] = {
            background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' stroke-width='2.5' fill='none' viewBox='0 0 24 24' stroke='${checkColor}' height='16' width='16'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' /%3E%3C/svg%3E") no-repeat`,
            backgroundPosition: 'center',
            [`@apply bg-${variant}`]: {}
        };
    });

    // =========================================================================
    // RADIOS
    // =========================================================================
    let radio = {};
    // Generate Variants
    variants.forEach(variant => {
        // Base Varirant
        radio[`.radio-${variant}`] = {
            [`@apply ${baseRadioClass}`]: {}
        };

        // Hover Variant
        radio[`.radio-${variant}:checked`] = {
            [`@apply ring-theme-radio-border-width ring-${variant} ring-inset`]: {}
        };
    });

    // =========================================================================
    // SWITCHES
    // =========================================================================
    let switches = {};
    // Generate Variants
    variants.forEach(variant => {
        // Base Varirant
        switches[`.switch-${variant}`] = {
            [`@apply ${baseSwitchClass} relative`]: {}
        };

        switches[`.switch-${variant}::after`] = {
            [`@apply ${baseSwitchToggleClass}`]: {}
        };

        // Hover Variant
        switches[`.switch-${variant}:checked`] = {
            [`@apply bg-${variant}`]: {}
        };

        switches[`.switch-${variant}:checked::after`] = {
            [`@apply translate-x-full`]: {}
        };
    });

    // =========================================================================
    // RANGE
    // =========================================================================

    return { ...inputs, ...checkbox, ...radio, ...switches };
};

module.exports = generateInputClasses;
