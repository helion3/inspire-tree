'use strict';

var isArray = require('lodash.isarray');

module.exports = function isArrayLike(array) {
    return Boolean(isArray(array) || (
        array &&
        typeof array !== 'function' &&
        typeof array !== 'string' &&
        typeof array.length === 'number'));
};
