'use strict';

var isArray = require('lodash.isarray');

module.exports = function isArrayLike(array) {
    return isArray(array) || (array && typeof array !== 'function' && typeof array.length === 'number');
};
