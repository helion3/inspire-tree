var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

// Are we minifying for prod?
var PROD = process.env.PROD || '';

// Which dir are we building to?
var DIR = process.env.DIR || 'build';

// Include DOM package?
var EXCLUDE_DOM = process.env.EXCLUDE_DOM || '';

var sassLoaders = [
    'css-loader',
    'autoprefixer-loader?browsers=last 5 versions',
    'sass-loader?includePaths[]=' + path.resolve(__dirname, './src')
];

var plugins = [
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
        DOM: !Boolean(EXCLUDE_DOM)
    })
];

if (PROD) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
}

function getFileName() {
    var base = '[name]';

    if (EXCLUDE_DOM) {
        base += '-core';
    }

    if (PROD) {
        base += '.min';
    }

    base += '.js';

    return base;
}

module.exports = {
    entry: {
        'inspire-tree': './src/tree.js'
    },
    output: {
        filename: getFileName(),
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
