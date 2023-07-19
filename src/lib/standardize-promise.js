import { isFunction, isObject } from 'lodash';

/**
 * Resolve promise-like objects consistently.
 *
 * @private
 * @param {object} promise Promise-like object.
 * @returns {Promise} Promise
 */
export function standardizePromise(promise) {
    return new Promise((resolve, reject) => {
        if (!isObject(promise)) {
            return reject(new Error('Invalid Promise'));
        }

        if (isFunction(promise.then)) {
            promise.then(resolve);
        }

        // jQuery promises use "error"
        if (isFunction(promise.error)) {
            promise.error(reject);
        }
        else if (isFunction(promise.catch)) {
            promise.catch(reject);
        }
    });
}
