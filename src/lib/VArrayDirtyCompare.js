'use strict';

var find = require('lodash.find');

/**
 * Returns whether or not a state is marked as dirty in
 * any object inside the given currentState.nodes collection.
 *
 * @private
 * @category DOM
 * @param {object} previousState Previous state.
 * @param {object} currentState  Current state.
 * @return {boolean} Any state is dirty.
 */
module.exports = function VDirtyCompare(previousState, currentState) {
    var diff = false;

    if (previousState.nodeCount !== currentState.nodeCount) {
        diff = true;
    }
    else {
        diff = find(currentState.nodes, 'itree.dirty', true);
    }

    return diff;
};
