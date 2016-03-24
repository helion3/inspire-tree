'use strict';

var _ = require('lodash');

module.exports = function isArrayLike(array) {
    return Boolean(_.isArray(array) || (
        array &&
        typeof array !== 'function' &&
        typeof array !== 'string' &&
        typeof array.length === 'number'));
};
