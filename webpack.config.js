var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

var PROD = process.env.PROD || '';
var DIR = process.env.DIR || 'build';

var sassLoaders = [
    'css-loader',
    'autoprefixer-loader?browsers=last 5 versions',
    'sass-loader?includePaths[]=' + path.resolve(__dirname, './src')
];

var plugins = [
    new ExtractTextPlugin('[name].css')
];

if (PROD) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
}

module.exports = {
    entry: {
        'inspire-tree': './src/tree.js'
    },
    output: {
        filename: PROD ? '[name].min.js' : '[name].js',
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
            test: /\.svg/,
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
