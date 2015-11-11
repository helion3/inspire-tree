'use strict';

/**
 * Returns whether or not a state is marked as dirty.
 *
 * @private
 * @category DOM
 * @param {object} previousState Previous state.
 * @param {object} currentState  Current state.
 * @return {boolean} State is dirty.
 */
module.exports = function VDirtyCompare(previousState, currentState) {
    return currentState.dirty;
};
