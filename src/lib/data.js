'use strict';

var isArray = require('lodash.isarray');
var isEmpty = require('lodash.isempty');
var map = require('lodash.map');

module.exports = (new function(window) {
    /**
     * Parses a raw collection of objects into a model used
     * within a tree. Adds state and other internal properties.
     *
     * @param {array|object} collection Collection of nodes
     * @return {array|object} Object model.
     */
    function collectionToModel(collection) {
        map(collection, function(object) {
            return objectToModel(object);
        });

        return collection;
    };

    /**
     * Generates a unique ID. Useful for generating keys
     * for nodes if source data doesn't define one.
     *
     * @return {string} Unique ID.
     */
    function generateId() {
        return window.performance.now().toString();
    };

    /**
     * Parse a raw object into a model used within a tree.
     *
     * @param {object} object Source object
     * @return {object} Final object
     */
    function objectToModel(object) {
        object.id = object.id || generateId();

        if (!object.itree) {
            object.itree = {
                state: {
                    selected: false
                }
            };
        }

        if (isArray(object.children) && !isEmpty(object.children)) {
            collectionToModel(object.children);
        }

        return object;
    };

    var data = this;

    /**
     * Loads data. Accepts an array or a promise.
     *
     * @param {array|function} loader Array of nodes, or promise resolving an array of nodes.
     * @return {object} Promise
     * @example
     *
     * data.load($.getJSON('nodes.json'));
     */
    data.load = function(loader) {
        return new Promise(function(resolve, reject) {
            if (isArray(loader)) {
                resolve(loader);
            }

            else if (typeof loader === 'object') {
                // Promise
                if (typeof loader.then === 'function') {
                    loader.then(resolve);
                }

                // jQuery promises use "error".
                if (typeof loader.error === 'function') {
                    loader.error(reject);
                }
                else if (typeof loader.catch === 'function') {
                    loader.catch(reject);
                }
            }
        });
    };

    return data;
}(window));
