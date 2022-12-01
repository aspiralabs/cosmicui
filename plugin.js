'use strict';

const plugin = require('tailwindcss/plugin');
const defaultConfig = require('./pluginFiles/defaultConfig');

const generateButtonClasses = require('./pluginFiles/buttons');
const generateBadgeClasses = require('./pluginFiles/badge');
const generateInputClasses = require('./pluginFiles/input');
const generateProgressClasses = require('./pluginFiles/progress');

// =============================================================================
// MAIN PLUGIN
// =============================================================================
const cosmicPlugin = plugin(function ({ addUtilities, addComponents, e, prefix, config, theme }) {
    console.log('\n================================================');
    console.log('Initializing Cosmic Plugin');
    console.log('================================================');

    const colors = theme('colors');
    const variants = Object.keys(colors);

    console.log(colors);

    // Add Components
    addComponents(generateButtonClasses(theme, variants));
    addComponents(generateBadgeClasses(theme, variants));
    addComponents(generateInputClasses(theme, variants));
    addComponents(generateProgressClasses(theme, variants));
}, defaultConfig);

module.exports = cosmicPlugin;
