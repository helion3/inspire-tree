var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var package = require('./package.json');

// Are we minifying for prod?
var PROD = process.env.PROD || false;

// Which dir are we building to?
var DIR = process.env.DIR || 'build';

// Should we bundle lodash?
var BUNDLE = process.env.BUNDLE || false;

// Include DOM package?
var EXCLUDE_DOM = process.env.EXCLUDE_DOM || false;

var banner = 'Inspire Tree v' + package.version + '\n\
' + package.repository + '\n\
\n\
Copyright 2015 Helion3, and other contributors\n\
Licensed under MIT. ' + package.repository + '/blob/master/LICENSE';

var sassLoaders = [
    'css-loader',
    'autoprefixer-loader?browsers=last 5 versions',
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
    module: {
        loaders: [{
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.woff/,
            loader: 'file'
        }, {
            test: /\.woff2/,
            loader: 'file'
        }, {
            test: /\.ttf/,
            loader: 'file'
        }, {
            test: /\.eot/,
            loader: 'file'
        }, {
            test: /\.png/,
            loader: 'file'
        }, {
            test: /\.jpg/,
            loader: 'file'
        }, {
            test: /\.gif/,
            loader: 'file'
        }]
    },
    plugins: plugins
};
