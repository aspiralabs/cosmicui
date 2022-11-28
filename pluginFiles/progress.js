const generateProgressClasses = (theme, variants) => {
    const baseClass = `h-2 w-full rounded-full`;

    // Create base class object
    let progress = {};

    // Generate Variants
    variants.forEach(variant => {
        progress[`.progress-${variant}`] = {
            [`@apply ${baseClass}`]: {}
        };

        progress[`.progress-${variant}::-webkit-progress-bar`] = {
            [`@apply bg-surface rounded-full`]: {}
        };

        progress[`.progress-${variant}::-webkit-progress-value`] = {
            [`@apply bg-${variant} rounded-full`]: {}
        };

        progress[`.progress-${variant}::-moz-progress-bar`] = {
            [`@apply bg-${variant} rounded-full`]: {}
        };
    });

    return progress;
};

module.exports = generateProgressClasses;
