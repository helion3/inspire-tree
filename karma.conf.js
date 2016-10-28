'use strict';

module.exports = function(config) {
    config.set({
        files: [
            {
                pattern: 'demos/sample-data/*.json',
                included: false
            },
            'node_modules/jquery/dist/jquery.js',
            'node_modules/lodash/lodash.js',
            'build/inspire-tree.js',
            'test/helpers.js',
            'test/**/*.spec.js'
        ],
        autoWatch: false,
        basePath: '',
        frameworks: ['mocha', 'chai', 'sinon-chai'],
        browsers: ['PhantomJS'],
        port: 9876,
        preprocessors: {
            'build/inspire-tree.js': ['coverage']
        },
        reporters: ['mocha', 'coverage'],
        coverageReporter: {
            type: 'html',
            dir: './coverage/',
            subdir: 'karma'
        },
        singleRun: true
    });
};
