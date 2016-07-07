'use strict';

import * as _ from 'lodash';

/**
 * Compares all keys on the given state. Returns true if any difference exists.
 *
 * @private
 * @category DOM
 * @param {object} previousState Previous state.
 * @param {object} currentState  Current state.
 * @return {boolean} Difference was found.
 */
export function VStateCompare(previousState, currentState) {
    var isDirty = false;

    _.each(currentState, function(val, key) {
        if (val !== previousState[key]) {
            isDirty = true;
            return false;
        }
    });

    return isDirty;
};
