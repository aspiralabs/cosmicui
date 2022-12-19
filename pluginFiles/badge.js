const generateBadgeClasses = (theme, variants) => {
    const baseClass = `inline-flex items-center gap-1.5 py-1 rounded-full text-xs font-medium px-3`;
    const baseCloseBtnClass = `flex-shrink-0 h-4 w-4 inline-flex items-center justify-center rounded-full`;

    // Create base class object
    let badges = {
        '.badge-base': {
            [`@apply ${baseClass}`]: {}
        }
    };

    // Generate Variants
    variants.forEach(variant => {
        // Base Varirant
        badges[`.badge-${variant}`] = {
            [`@apply badge-base bg-${variant} text-${variant}-pair`]: {}
        };

        badges[`.badge-${variant}-close-btn`] = {
            [`@apply ${baseCloseBtnClass} text-${variant}-pair`]: {}
        };

        badges[`.badge-${variant}-close-btn:hover`] = {
            [`@apply bg-${variant}-hover`]: {}
        };
    });

    return badges;
};

module.exports = generateBadgeClasses;
