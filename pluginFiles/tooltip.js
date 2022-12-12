const generateTooltipClasses = (theme, variants) => {
    const baseClass = `absolute rounded px-2 py-1 bg-tooltip text-sm text-white max-w-xs`;
    const tooltipTop = `-translate-x-1/2 top-auto left-1/2 right-auto bottom-full mb-1`;
    const tooltipBottom = `-translate-x-1/2 top-full left-1/2 right-auto bottom-auto mt-1`;
    const tooltipLeft = `-translate-y-1/2 top-1/2 left-auto right-full bottom-auto mr-1`;
    const tooltipRight = `-translate-y-1/2 top-1/2 right-auto left-full bottom-auto ml-1`;

    // Create base class object
    let tooltip = {
        '.tooltip': {
            [`@apply inline-block relative`]: {}
        },
        '.tooltip:before': {
            [`@apply opacity-0 transition  duration-200 ease-in-out`]: {}
        },
        '.tooltip:hover:before': {
            [`@apply delay-100 opacity-100`]: {}
        },
        '.tooltip-top:before': {
            [`@apply ${baseClass} ${tooltipTop}`]: {},
            content: 'attr(data-tip)'
        },
        '.tooltip-bottom:before': {
            [`@apply ${baseClass} ${tooltipBottom}`]: {},
            content: 'attr(data-tip)'
        },
        '.tooltip-left:before': {
            [`@apply ${baseClass} ${tooltipLeft}`]: {},
            content: 'attr(data-tip)'
        },
        '.tooltip-right:before': {
            [`@apply ${baseClass} ${tooltipRight}`]: {},
            content: 'attr(data-tip)'
        }
    };

    return tooltip;
};

module.exports = generateTooltipClasses;
