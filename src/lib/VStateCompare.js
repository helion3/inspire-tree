'use strict';

var each = require('lodash.foreach');

module.exports = function VStateCompare(previousState, currentState) {
    var isDirty = false;

    each(currentState, function(val, key) {
        if (val !== previousState[key]) {
            isDirty = true;
            return false;
        }
    });

    return isDirty;
};
