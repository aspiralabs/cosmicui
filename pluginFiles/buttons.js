const generateButtonClasses = (theme, variants) => {
    const baseClass = `font-bold rounded-theme-button px-4 text-sm transition duration-200 motion-reduce:transition-none disabled:cursor-not-allowed flex items-center gap-2.5 justify-center h-10`;

    // Create base class object
    let buttons = {
        '.btn-base': {
            [`@apply ${baseClass}`]: {}
        }
    };

    // Generate Variants
    variants.forEach(variant => {
        // Base Varirant
        buttons[`.btn-${variant}`] = {
            [`@apply btn-base bg-${variant} text-${variant}-pair`]: {}
        };

        // Hover Variant
        buttons[`.btn-${variant}:hover`] = {
            [`@apply bg-${variant}-hover`]: {}
        };

        // Disabled Variant
        buttons[`.btn-${variant}:disabled`] = {
            [`@apply bg-${variant}-disabled`]: {}
        };

        // Outlined Version
        buttons[`.btn-${variant}-outlined`] = {
            [`@apply btn-base border-2 border-${variant} text-${variant}`]: {}
        };

        // Outlined Hover
        buttons[`.btn-${variant}-outlined:hover`] = {
            [`@apply border-${variant}-hover `]: {}
        };

        // Outlined Disabled
        buttons[`.btn-${variant}-outlined:hover`] = {
            [`@apply border-${variant}-disabled text-${variant}-disabled`]: {}
        };
    });

    return buttons;
};

module.exports = generateButtonClasses;
