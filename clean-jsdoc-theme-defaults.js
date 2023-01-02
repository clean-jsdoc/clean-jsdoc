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
        'removeComments': false,
        'removeCommentsFromCDATA': false,
        'removeCDATASectionsFromCDATA': false,
        'removeEmptyElements': false,
        'removeOptionalTags': false,
        'useShortDoctype': false,
        'removeStyleLinkTypeAttributes': false,
        'removeScriptTypeAttributes': false,
        'keepClosingSlash': true,
        'html5': false
    },
    'css': {
        'compatibility': '*'
    },
    'js': {
        'ecma': 5
    }
};

const babelOpts = {
    'presets': [
        [
            '@babel/preset-env',
            {
                'targets': {
                    'ie': '11'
                }
            }
        ],
        [
            'minify', {
                'evaluate': false,
                'removeDebugger': true,
                'removeUndefined': false,
                'undefinedToVoid': false
            }
        ]
    ],
    'comments': false
};

module.exports = {
    SECTION_TYPE,
    defaultSections,
    minifyOpts,
    babelOpts
};
