'use strict';

import * as _ from 'lodash';
import { Promise } from 'es6-promise';

/**
 * Resolve promise-like objects consistently.
 *
 * @private
 * @param {object} promise Promise-like object.
 * @returns {Promise} Promise
 */
export function standardizePromise(promise) {
    return new Promise((resolve, reject) => {
        if (!_.isObject(promise)) {
            return reject(new Error('Invalid Promise'));
        }

        if (_.isFunction(promise.then)) {
            promise.then(resolve);
        }

        // jQuery promises use "error"
        if (_.isFunction(promise.error)) {
            promise.error(reject);
        }
        else if (_.isFunction(promise.catch)) {
            promise.catch(reject);
        }
    });
};
