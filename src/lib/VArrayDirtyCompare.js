'use strict';

import _ from 'lodash';

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
        diff = _.find(currentState.nodes, 'itree.dirty');
    }

    return diff;
};
