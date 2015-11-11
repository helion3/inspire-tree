'use strict';

var find = require('lodash.find');

module.exports = function VDirtyCompare(previousState, currentState) {
    return find(currentState.nodes, 'itree.dirty', true);
};
