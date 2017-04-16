// Libs
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import gzip from 'rollup-plugin-gzip';
import nodeResolve from 'rollup-plugin-node-resolve';
import path from 'path';
import uglify from 'rollup-plugin-uglify';

// Read package config
const pkgConfig = require('./package.json');

// Constants
const DIST = process.env.DIST || false;
const MIN = process.env.MIN || false;

var banner = `/* Inspire Tree
 * @version ${pkgConfig.version}
 * ${pkgConfig.repository}
 * @copyright Copyright 2015 Helion3, and other contributors
 * @license Licensed under MIT
 *          see ${pkgConfig.repository}/blob/master/LICENSE
 */`;

let plugins = [
    babel({
        exclude: 'node_modules/**'
    }),
    nodeResolve({
        jsnext: true,
        browser: true
    }),
    commonjs({
        sourceMap: false,
        namedExports: {
            'node_modules/es6-promise/dist/es6-promise.js': ['Promise'],
            'node_modules/eventemitter2/lib/eventemitter2.js': ['EventEmitter2']
        }
    })
];

if (MIN) {
    plugins.push(uglify({
        output: {
            comments: /@license/
        }
    }));
    plugins.push(gzip());
}

export default {
    entry: path.join('src', 'tree.js'),
    dest: path.join(DIST ? 'dist' : 'build', 'inspire-tree' + (MIN ? '.min' : '') + '.js'),
    format: 'umd',
    moduleName: 'InspireTree',
    external: ['lodash'],
    banner: banner,
    globals: {
        lodash: '_'
    },
    plugins: plugins
};
