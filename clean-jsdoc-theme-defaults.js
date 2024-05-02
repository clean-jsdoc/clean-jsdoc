/* eslint camelcase: 0 */
const SECTION_TYPE = {
    'Classes': 'Classes',
    'Modules': 'Modules',
    'Externals': 'Externals',
    'Events': 'Events',
    'Namespaces': 'Namespaces',
    'Mixins': 'Mixins',
    'Tutorials': 'Tutorials',
    'Interfaces': 'Interfaces',
    'Global': 'Global',
};

const defaultSections = [
    SECTION_TYPE.Modules,
    SECTION_TYPE.Classes,
    SECTION_TYPE.Externals,
    SECTION_TYPE.Events,
    SECTION_TYPE.Namespaces,
    SECTION_TYPE.Mixins,
    SECTION_TYPE.Tutorials,
    SECTION_TYPE.Interfaces,
    SECTION_TYPE.Global
];

const minifyOpts = {
    parse: {
        bare_returns: true
    },
    compress: {
        drop_console: true,
        side_effects: false,
        ecma: 2016,
    },
    mangle: {
        safari10: true
    }
};

module.exports = {
    SECTION_TYPE,
    defaultSections,
    minifyOpts
};
