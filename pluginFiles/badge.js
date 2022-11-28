const generateBadgeClasses = (theme, variants) => {
    const baseClass = `inline-flex items-center gap-1.5 py-1 rounded-full text-xs font-medium px-3`;

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
    });

    return badges;
};

module.exports = generateBadgeClasses;
