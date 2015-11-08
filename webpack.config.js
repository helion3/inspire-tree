var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

var sassLoaders = [
    'css-loader',
    'autoprefixer-loader?browsers=last 5 versions',
    'sass-loader?includePaths[]=' + path.resolve(__dirname, './src')
];

module.exports = {
    entry: {
        'inspire-tree': './src/tree.js'
    },
    output: {
        filename: '[name].js',
        path: './dist',
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
        }]
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ]
};
