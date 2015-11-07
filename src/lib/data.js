'use strict';

var cloneDeep = require('lodash.cloneDeep');
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
                    collapsed: true,
                    selected: false
                }
            };
        }

        if (isArray(object.children) && !isEmpty(object.children)) {
            collectionToModel(object.children);
        }

        return object;
    };

    /**
     * Iterate nodes recursively.
     *
     * @param {array} array Node array.
     * @param {function} iteratee Iteratee function.
     * @return {array} Resulting node array.
     */
    function recurse(array, iteratee) {
        each(array, function(item, key) {
            array[key] = iteratee(item);

            if (isArray(item.children) && !isEmpty(item.children)) {
                item.children = recurse(item.children, iteratee);
            }
        });

        return array;
    };

    var rerender = function() {
        // @todo move this. should be abstracted and allow batch changes
        api.dom.renderNodes(model);
    };

    var data = this;
    var model = [];

    /**
     * Expand immediate children for this node, if any.
     *
     * @param {object} node Node object.
     * @return {void}
     */
    data.collapseNode = function(node) {
        node.itree.state.collapsed = true;

        api.events.emit('node.collapsed', node);

        rerender();
    };

    data.deselectAll = function() {
        recurse(model, data.deselectNode);
    };

    /**
     * Deselect a node.
     *
     * @param {object} node Node object.
     * @return {pbject} Node object.
     */
    data.deselectNode = function(node) {
        node.itree.state.selected = false;

        api.events.emit('node.deselected', node);

        rerender();

        return node;
    };

    /**
     * Expand immediate children for this node, if any.
     *
     * @param {object} node Node object.
     * @return {void}
     */
    data.expandNode = function(node) {
        node.itree.state.collapsed = false;

        api.events.emit('node.expanded', node);

        rerender();
    };

    data.getSelected = function(nodes, flat) {
        var selected = [];

        if (flat) {
            recurse((nodes || model), function(node) {
                if (node.itree.state.selected) {
                    selected.push(node);
                }

                return node;
            });
        }
        else {
            each((nodes || model), function(node) {
                var nodeClone;

                if (node.itree.state.selected) {
                    nodeClone = cloneDeep(node);
                }

                // Are any children selected?
                if (!nodeClone && isArray(node.children) && node.children.length) {
                    var children = data.getSelected(node.children);
                    if (children.length) {
                        nodeClone = cloneDeep(node);
                        nodeClone.children = children;
                    }
                }

                if (nodeClone) {
                    selected.push(nodeClone);
                }
            });
        }

        return selected;
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
     * Select a node. If already selected, no change made.
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
