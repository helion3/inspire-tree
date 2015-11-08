'use strict';

module.exports = function(config) {
    config.set({
        files: [{
            pattern: 'dist/inspire-tree.js',
            included: true
        },
        'test/**/*.spec.js'],
        autoWatch: false,
        basePath: '',
        frameworks: ['mocha', 'chai'],
        browsers: ['PhantomJS'],
        port: 9876,
        preprocessors: {
            'dist/inspire-tree.js': ['coverage']
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
