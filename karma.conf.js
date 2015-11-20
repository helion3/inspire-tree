'use strict';

module.exports = function(config) {
    config.set({
        files: [
            {
                pattern: 'demos/sample-data/*.json',
                included: false
            },
            'bower_components/jquery/dist/jquery.js',
            'build/inspire-tree.js',
            'test/helpers.js',
            'test/tree.spec.js',
            'test/treenode/*.spec.js',
            'test/treenodes/*.spec.js',
            'test/dom/*.spec.js',
            'test/data/*.js'
        ],
        autoWatch: false,
        basePath: '',
        frameworks: ['mocha', 'chai'],
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
