require('dotenv').config();

const browserstack = require('browserstack-local');

exports.config = {
    'user': process.env.BROWSERSTACK_USERNAME,
    'key': process.env.BROWSERSTACK_ACCESS_KEY,
    'specs': [`${process.env.PWD}/tests/specs/mobile/layout.js`],
    'capabilities': [{
        'browserName': 'iPhone',
        'bstack:options': {
            'sessionName': 'iPhone-ui-test',
            'projectName': 'clean-jsdoc',
            'buildName': 'clean-jsdoc-mobile-ui-testing',
            'deviceName': 'iPhone 14',
            'osVersion': '16',
            'realMobile': true,
            'local': true,
            'appiumLogs': false,
            'seleniumLogs': false,
            'localIdentifier': process.env.BROWSERSTACK_LOCAL_IDENTIFIER
        }
    }],
    'runner': 'local',
    'logLevel': 'error',
    'coloredLogs': false,
    'baseUrl': `http://bs-local.com:${process.env.PORT || 3000}`,
    'waitforTimeout': 50000,
    'connectionRetryTimeout': 90000,
    'connectionRetryCount': 3,
    'framework': 'jasmine',
    'jasmineNodeOpts': {
        'defaultTimeoutInterval': 90000,
        'failFast': true
    },
    'onPrepare': (config, capabilities) => {
        console.log('Connecting to local server');

        return new Promise((resolve, reject) => {
            exports.bsLocal = new browserstack.Local();
            exports.bsLocal.start({
                'key': exports.config.key,
                'force': 'true',
                'onlyAutomate': 'true'
            }, error => {
                if (error) {
                    return reject(error);
                }

                resolve();
            });
        });
    },
    'onComplete'(capabilties, specs) {
        exports.bsLocal.stop(() => {
            console.log('Shutting down local server');
        });
    }
};
