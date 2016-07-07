'use strict';

import * as _ from 'lodash';

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
export function VArrayDirtyCompare(previousState, currentState) {
    var diff = false;

    if (previousState.nodeCount !== currentState.nodeCount) {
        diff = true;
    }
    else {
        diff = _.find(currentState.nodes, 'itree.dirty');
    }

    return diff;
};
