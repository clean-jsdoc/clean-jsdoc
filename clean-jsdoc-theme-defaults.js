const SECTION_TYPE = {
    'Classes': 'Classes',
    'Modules': 'Modules',
    'Externals': 'Externals',
    'Events': 'Events',
    'Namespaces': 'Namespaces',
    'Mixins': 'Mixins',
    'Tutorials': 'Tutorials',
    'Interfaces': 'Interfaces',
    'Global': 'Global'
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
    'html': {
        'removeAttributeQuotes': false,
        'removeComments': true,
        'removeCommentsFromCDATA': false,
        'removeCDATASectionsFromCDATA': false,
        'removeEmptyElements': false,
        'removeOptionalTags': false,
        'useShortDoctype': true,
        'removeStyleLinkTypeAttributes': false,
        'removeScriptTypeAttributes': true,
        'keepClosingSlash': false,
        'html5': true
    },
    'css': {
        'compatibility': '*'
    },
    'js': {
        'ecma': 6
    }
};

module.exports = {
    SECTION_TYPE,
    defaultSections,
    minifyOpts
};
