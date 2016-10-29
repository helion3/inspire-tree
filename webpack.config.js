var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var pkgConfig = require('./package.json');

// Are we minifying for prod?
var PROD = process.env.PROD || false;

// Which dir are we building to?
var DIR = process.env.DIR || 'build';

// Should we bundle lodash?
var BUNDLE = process.env.BUNDLE || false;

// Include DOM package?
var EXCLUDE_DOM = process.env.EXCLUDE_DOM || false;

var banner = 'Inspire Tree v' + pkgConfig.version + '\n\
' + pkgConfig.repository + '\n\
\n\
Copyright 2015 Helion3, and other contributors\n\
Licensed under MIT. ' + pkgConfig.repository + '/blob/master/LICENSE';

var sassLoaders = [
    'css-loader',
    'postcss-loader',
    'sass-loader?includePaths[]=' + path.resolve(__dirname, './src')
];

var plugins = [
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
        DOM: !Boolean(EXCLUDE_DOM)
    }),
    new webpack.BannerPlugin(banner)
];

if (PROD) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
}

if (BUNDLE) {
    plugins.push(new LodashModuleReplacementPlugin({
        shorthands: true,
        flattening: true,
        collections: true,
        paths: true
    }));
}

var externals = {};
if (!BUNDLE) {
    externals = {
        lodash: {
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash',
            root: '_'
        }
    };
}

var babelPlugins = ['add-module-exports'];

if (BUNDLE) {
    babelPlugins.push('lodash');
}

module.exports = {
    entry: {
        'inspire-tree': './src/tree.js'
    },
    externals: externals,
    output: {
        filename: (function() {
            var base = '[name]';

            if (EXCLUDE_DOM) {
                base += '-core';
            }

            if (BUNDLE) {
                base += '-bundled';
            }

            if (PROD) {
                base += '.min';
            }

            base += '.js';

            return base;
        }()),
        path: DIR,
        library: 'InspireTree',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    module: {
        loaders: [{
            loader: 'babel-loader' + (BUNDLE ? '?plugins[]=lodash' : '')
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.gif/,
            loader: 'file'
        }]
    },
    plugins: plugins,
    postcss: [autoprefixer({ browsers: ['last 2 versions'] })]
};
