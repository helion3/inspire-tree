'use strict';

var cuid = require('cuid');
var each = require('lodash.foreach');
var isArray = require('lodash.isarray');
var isEmpty = require('lodash.isempty');
var isFunction = require('lodash.isfunction');
var map = require('lodash.map');

module.exports = function InspireData(api) {
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
        return cuid();
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

    var rerender = function() {
        // @todo move this. should be abstracted and allow batch changes
        api.dom.renderNodes(model);
    };

    var data = this;
    var model = [];

    /**
     * Selected a node. If already selected, no change made.
     *
     * @param {object} node Node object.
     * @return {void}
     */
    data.deselectNode = function(node) {
        node.itree.state.selected = false;

        api.events.emit('node.deselected', node);

        rerender();
    };

    /**
     * Get a node by it's unique id.
     *
     * @param {string} id Unique ID.
     * @param {array} nodes Base collection to search in.
     * @return {object} Found node.
     */
    data.getNodeById = function(id, nodes) {
        var node;

        each((nodes || model), function(item) {
            if (item.id === id) {
                node = item;
            }

            if (!node && isArray(item.children) && !isEmpty(item.children)) {
                node = data.getNodeById(id, item.children);
            }

            if (node) {
                return false;
            }
        });

        return node;
    };

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
                model = collectionToModel(loader);
                resolve(model);
            }

            else if (typeof loader === 'object') {
                // Promise
                if (isFunction(loader.then)) {
                    loader.then(function(results) {
                        model = collectionToModel(results);
                        resolve(model);
                    });
                }

                // jQuery promises use "error".
                if (isFunction(loader.error)) {
                    loader.error(reject);
                }
                else if (isFunction(loader.catch)) {
                    loader.catch(reject);
                }
            }
        });
    };

    /**
     * Selected a node. If already selected, no change made.
     *
     * @param {object} node Node object.
     * @return {void}
     */
    data.selectNode = function(node) {
        node.itree.state.selected = true;

        api.events.emit('node.selected', node);

        rerender();
    };

    return data;
};
