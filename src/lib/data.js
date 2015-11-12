'use strict';

// Libs
var assign = require('lodash.assign');
var cloneDeep = require('lodash.clonedeep');
var cuid = require('cuid');
var each = require('lodash.foreach');
var get = require('lodash.get');
var isArray = require('lodash.isarray');
var isEmpty = require('lodash.isempty');
var isFunction = require('lodash.isfunction');
var isObject = require('lodash.isobject');
var isRegExp = require('lodash.isregexp');
var isString = require('lodash.isstring');
var map = require('lodash.map');
var remove = require('lodash.remove');
var transform = require('lodash.transform');
var treeNodeFactory = require('./TreeNode');

module.exports = function InspireData(api) {
    var TreeNode = treeNodeFactory(api);

    /**
     * Parses a raw collection of objects into a model used
     * within a tree. Adds state and other internal properties.
     *
     * @private
     * @param {array|object} collection Collection of nodes
     * @param {object} parent Pointer to parent object
     * @return {array|object} Object model.
     */
    function collectionToModel(collection, parent) {
        return transform(collection, function(newCollection, node) {
            newCollection.push(objectToModel(node, parent));
        });
    };

    /**
     * Ensure all parent nodes are expanded.
     *
     * @private
     * @param {object} node Node object.
     * @return {void}
     */
    function expandParents(node) {
        if (node.itree.parent) {
            node = node.itree.parent;

            node.itree.state.collapsed = false;
            node.itree.state.hidden = false;
            api.dom.markNodeDirty(node);

            api.events.emit('node.expanded', node);

            expandParents(node);
        }
    }

    /**
     * Merge a node into an existing context - a model
     * or another node's children. If the ID exists
     * the node is skipped and we try its children.
     *
     * @private
     * @param {array} context Array of node objects.
     * @param {object} node Node object.
     * @return {array} Array of new nodes.
     */
    var mergeNode = function(context, node) {
        var newNodes = [];

        if (node.id) {
            // Does node already exist
            var existing = data.getNodeById(node.id);
            if (existing) {
                existing.itree.state.hidden = false;
                api.dom.markNodeDirty(existing);

                // Ensure existing accepts children
                if (!isArray(existing.children)) {
                    existing.children = [];
                }

                each(node.children, function(child) {
                    newNodes.concat(mergeNode(existing.children, child));
                });
            }
            else {
                context.push(node);
                newNodes.push(node);
            }
        }

        return newNodes;
    };

    /**
     * Parse a raw object into a model used within a tree.
     *
     * Note: Uses native js over lodash where performance
     * benefits most, since this handles every node.
     *
     * @private
     * @param {object} object Source object
     * @param {object} parent Pointer to parent object.
     * @return {object} Final object
     */
    function objectToModel(object, parent) {
        // Create or type-ensure ID
        object.id = object.id || cuid();
        if (typeof object.id !== 'string') {
            object.id = object.id.toString();
        }

        // High-performance default assignments
        var itree = object.itree = object.itree || {};
        itree.icon = itree.icon || false;

        var li = itree.li = itree.li || {};
        li.attributes = li.attributes || {};

        var state = itree.state = itree.state || {};
        state.collapsed = state.collapsed || true;
        state.hidden = state.hidden || false;
        state.selected = state.selected || false;

        // Save parent, if any.
        object.itree.parent = parent;

        if (isArray(object.children) && object.children.length) {
            object.children = collectionToModel(object.children, object);
        }

        // Wrap
        object = assign(new TreeNode(), object);

        return object;
    };

    var data = this;
    var model = [];

    /**
     * Add new node as a child of another.
     *
     * @category Data
     * @param {object} parent Node object.
     * @param {object} child Node object.
     * @return {object} Node object.
     */
    data.addChildNode = function(parent, child) {
        child = objectToModel(child);

        if (!isArray(parent.children)) {
            parent.children = [];
        }

        parent.children.push(child);

        api.dom.markNodeDirty(child);
        api.dom.applyChanges();

        return child;
    };

    /**
     * Add a node.
     *
     * @category Data
     * @param {object} node Node object.
     * @return {object} Node object.
     */
    data.addNode = function(node) {
        node = objectToModel(node);
        var newNodes = mergeNode(model, node);

        if (newNodes.length) {
            api.events.emit('node.added', node);
        }

        api.dom.markNodeDirty(node);
        api.dom.applyChanges();

        return node;
    };

    /**
     * Add nodes.
     *
     * @category Data
     * @param {array} nodes Array of node objects.
     * @return {array} Added node objects.
     */
    data.addNodes = function(nodes) {
        api.dom.batch();

        transform(nodes, function(newNodes, node) {
            newNodes.push(data.addNode(node));
        });

        api.dom.end();

        return nodes;
    };

    /**
     * Shows all nodes and collapses parents.
     *
     * @category Data
     * @return {void}
     */
    data.clearSearch = function() {
        api.dom.showAll();
    };

    /**
     * Copies all parents of a node.
     *
     * @category Data
     * @param {object} node Object node.
     * @param {boolean} excludeNode Exclude given node from hierarchy.
     * @return {object} Root node object with hierarchy.
     */
    data.copyHierarchy = function(node, excludeNode) {
        var parents = cloneDeep(data.getParentNodes(node));

        // Remove old hierarchy data
        map(parents, function(node) {
            delete node.itree.parent;
            delete node.children;
            return node;
        });

        parents = parents.reverse();

        if (!excludeNode) {
            parents.push(node);
        }

        var hierarchy = parents[0];
        var pointer = hierarchy;
        var l = parents.length;
        each(parents, function(parent, key) {
            if (key + 1 < l) {
                pointer.children = [
                    parents[key + 1]
                ];

                pointer = pointer.children[0];
            }
        });

        return hierarchy;
    };

    /**
     * Copies nodes to a new tree instance.
     *
     * @category Data
     * @param {array} node Node object
     * @param {boolean} hierarchy Include necessary ancestors to match hierarchy.
     * @return {void}
     */
    data.copyNode = function(node, hierarchy) {
        if (hierarchy) {
            node = data.copyHierarchy(node);
        }

        return {

            /**
             * Sets a destination.
             *
             * @category CopyNode
             * @param {object} dest Destination Inspire Tree.
             * @return {void}
             */
            to: function(dest) {
                if (!isFunction(dest.data.addNode)) {
                    throw new Error('Destination must be an Inspire Tree instance.');
                }

                dest.data.addNode(data.exportNode(node));
            }
        };
    };

    /**
     * Copies nodes to a new tree instance.
     *
     * @category Data
     * @param {array} nodes Array of node objects.
     * @param {boolean} hierarchy Include necessary ancestors to match hierarchy.
     * @return {void}
     */
    data.copyNodes = function(nodes, hierarchy) {
        return {

            /**
             * Sets a destination.
             *
             * @category CopyNode
             * @param {object} dest Destination Inspire Tree.
             * @return {void}
             */
            to: function(dest) {
                if (!isFunction(dest.data.addNodes)) {
                    throw new Error('Destination must be an Inspire Tree instance.');
                }

                each((nodes || model), function(node) {
                    data.copyNode(node, hierarchy).to(dest);
                });
            }
        };
    };

    /**
     * Deselect all nodes.
     *
     * @category Data
     * @return {void}
     */
    data.deselectAll = function() {
        api.dom.batch();
        data.recurseDown(model, data.deselectNode);
        api.dom.end();
    };

    /**
     * Deselect a node.
     *
     * @category Data
     * @param {object} node Node object.
     * @return {pbject} Node object.
     */
    data.deselectNode = function(node) {
        if (node.itree.state.selected) {
            node.itree.state.selected = false;

            api.events.emit('node.deselected', node);

            api.dom.markNodeDirty(node);
            api.dom.applyChanges();
        }

        return node;
    };

    /**
     * Clones a node object and removes any
     * itree instance information/state.
     *
     * @category Data
     * @param {array} node Node object
     * @return {array} Cloned/modified node object.
     */
    data.exportNode = function(node) {
        var nodeClone = cloneDeep(node);

        data.recurseDown(nodeClone, function(node) {
            node.itree = null;
            return node;
        });

        return nodeClone;
    };

    /**
     * Clones an array of node objects and removes any
     * itree instance information/state.
     *
     * @category Data
     * @param {array} nodes Array of node objects.
     * @return {array} Cloned/modified node objects.
     */
    data.exportNodes = function(nodes) {
        var nodeClones = cloneDeep(nodes);

        data.recurseDown(nodeClones, function(node) {
            node.itree = null;
            return node;
        });

        return nodeClones;
    };

    /**
     * Flattens a hierarchy, returning only node(s) with the
     * expected state, for operations which must exclude parents.
     *
     * @category Data
     * @param {array} nodes Array of node objects.
     * @param {string} flag Which state flag to filter by.
     * @return {array} Flat array of matching nodes.
     */
    data.flattenNodes = function(nodes, flag) {
        var flat = [];
        flag = flag || 'selected';

        if (isArray(nodes) && !isEmpty(nodes)) {
            each(nodes, function(node) {
                if (node.itree.state[flag]) {
                    flat.push(node);
                }
                else {
                    flat = flat.concat(data.flattenNodes(node.children));
                }
            });
        }

        return flat;
    };

    /**
     * Get all nodes in a tree.
     *
     * @category Data
     * @return {array} Array of node objects.
     */
    data.getNodes = function() {
        return model;
    };

    /**
     * Get a node.
     *
     * @category Data
     * @alias getNodeById
     * @param {string|number} ref ID of node.
     * @return {object} Node object.
     */
    data.getNode = function(ref) {
        return data.getNodeById(ref);
    };

    /**
     * Get a node by it's unique id.
     *
     * @category Data
     * @param {string} id Unique ID.
     * @param {array} nodes Base collection to search in.
     * @return {object} Found node.
     */
    data.getNodeById = function(id, nodes) {
        var node;

        if (!isString(id)) {
            id = id.toString();
        }

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
     * Get all nodes in a tree.
     *
     * @category Data
     * @return {array} Array of node objects.
     */
    data.getNodes = function() {
        return model;
    };

    /**
     * Returns parent nodes for a node. Excludes any siblings.
     *
     * @category Data
     * @param {object} node Node object.
     * @return {array} Node objects.
     */
    data.getParentNodes = function(node) {
        var parents = [];

        if (get(node, 'itree.parent')) {
            parents.push(node.itree.parent);
            parents = parents.concat(data.getParentNodes(node.itree.parent));
        }

        return parents;
    };

    /**
     * Returns a flat array of selected nodes.
     *
     * @category Data
     * @param {array} nodes Array of node objects to search within.
     * @return {array} Selected nodes.
     */
    data.getSelectedNodes = function(nodes) {
        return data.flattenNodes((nodes || model), 'selected');
    };

    /**
     * Get a textual hierarchy for a given node. An array
     * of text from this node's root ancestor to the given node.
     *
     * @category Data
     * @param {object} node Node object.
     * @return {array} Array of node texts.
     */
    data.getTextualHierarchy = function(node) {
        var paths = [];

        var parents = data.getParentNodes(node).reverse();
        each(parents, function(parent) {
            paths.push(parent.text);
        });

        paths.push(node.text);

        return paths;
    };

    /**
     * Loads data. Accepts an array or a promise.
     *
     * @category Data
     * @param {array|function} loader Array of nodes, or promise resolving an array of nodes.
     * @return {object} Promise
     * @example
     *
     * data.load($.getJSON('nodes.json'));
     */
    data.load = function(loader) {
        var resolve = function(nodes) {
            // Emit raw data
            api.events.emit('data.loaded', nodes);

            model = collectionToModel(nodes);

            api.events.emit('model.loaded', model);
            api.dom.renderNodes(model);
        };

        var reject = function(err) {
            api.events.emit('data.loaderror', err);
            throw err;
        };

        // Data given already as an array
        if (isArray(loader)) {
            resolve(loader);
        }

        // Data loader requires a caller/callback
        else if (isFunction(loader)) {
            loader(null, resolve, reject);
        }

        // Data loader is likely a promise
        else if (isObject(loader)) {
            // Promise
            if (isFunction(loader.then)) {
                loader.then(resolve);
            }

            // jQuery promises use "error".
            if (isFunction(loader.error)) {
                loader.error(reject);
            }
            else if (isFunction(loader.catch)) {
                loader.catch(reject);
            }
        }

        else {
            throw new Error('Invalid data loader.');
        }
    };

    /**
     * Initiate a dynamic load of children for a given node.
     *
     * This requires `opts.data` to be a function which accepts
     * three arguments: node, resolve, reject.
     *
     * Use the `node` to filter results.
     *
     * On load success, pass the result array to `resolve`.
     * On error, pass the Error to `reject`.
     *
     * @category Data
     * @param {object} node Node object.
     * @return {void}
     */
    data.loadChildren = function(node) {
        var isDynamic = get(api, 'config.dynamic');
        if (isDynamic) {
            api.config.data(
                node,
                function resolver(results) {
                    api.dom.batch();
                    node.children = collectionToModel(results, node);
                    api.dom.markNodeDirty(node);
                    api.dom.end();
                },
                function rejecter(err) {
                    api.events.emit('data.loaderror', err);

                    node.children = [];
                    api.dom.markNodeDirty(node);
                    api.dom.applyChanges();
                }
            );
        }
    };

    /**
     * Iterate down node/children recursively.
     *
     * @category Data
     * @param {array|object} collection Array of nodes or node object.
     * @param {function} iteratee Iteratee function.
     * @return {array} Resulting node array.
     */
    data.recurseDown = function(collection, iteratee) {
        // Recurse each element in this array
        if (isArray(collection)) {
            each(collection, function(element, i) {
                collection[i] = data.recurseDown(element, iteratee);
            });
        }

        else if (isObject(collection)) {
            collection = iteratee(collection);

            // Recurse children
            if (isArray(collection.children) && !isEmpty(collection.children)) {
                collection.children = data.recurseDown(collection.children, iteratee);
            }
        }

        return collection;
    };

    /**
     * Iterate up a node and its parents.
     *
     * @category Data
     * @param {object} node Object node.
     * @param {function} iteratee Iteratee function.
     * @return {object} Resulting node.
     */
    data.recurseUp = function(node, iteratee) {
        iteratee(node);

        if (isObject(node.itree.parent)) {
            data.recurseUp(node.itree.parent, iteratee);
        }

        return node;
    };

    /**
     * Removes all nodes.
     *
     * @category Data
     * @return {void}
     */
    data.removeAll = function() {
        model = [];
        api.dom.applyChanges();
    };

    /**
     * Remove a node from the tree.
     *
     * @category Data
     * @param {object} node Node object.
     * @return {void}
     */
    data.removeNode = function(node) {
        var context = (node.parent ? node.parent.children : model);
        remove(context, { id: node.id });

        api.events.emit('node.removed', data.exportNode(node));

        api.dom.applyChanges();
    };

    /**
     * Search nodes, showing only those that match and the necessary hierarchy.
     *
     * @category Data
     * @param {*} query Search string, RegExp, or function.
     * @return {array} Array of matching node objects.
     */
    data.search = function(query) {
        var matches = [];

        var custom = get(api, 'config.search');
        if (isFunction(custom)) {
            return custom(
                query,
                function resolver(nodes) {
                    api.dom.batch();

                    api.dom.hideAll();
                    each(nodes, function(node) {
                        mergeNode(model, node);
                    });

                    api.dom.end();
                },
                function rejecter(err) {
                    api.events.emit('data.loaderror', err);
                }
            );
        }

        // Don't search if query empty
        if (isString(query) && isEmpty(query)) {
            return data.clearSearch();
        }

        if (isString(query)) {
            query = new RegExp(query, 'i');
        }

        var predicate;
        if (isRegExp(query)) {
            predicate = function(node) {
                return query.test(node.text);
            };
        }
        else {
            predicate = query;
        }

        if (!isFunction(predicate)) {
            throw new TypeError('Search predicate must be a string, RegExp, or function.');
        }

        api.dom.batch();

        data.recurseDown(model, function(node) {
            var match = predicate(node);
            var wasHidden = node.itree.state.hidden;
            node.itree.state.hidden = !match;

            // If hidden state will change
            if (wasHidden !== node.itree.state.hidden) {
                api.dom.markNodeDirty(node);
            }

            if (match) {
                matches.push(node);

                expandParents(node);
            }

            return node;
        });

        api.dom.end();

        return matches;
    };

    /**
     * Select a node. If already selected, no change made.
     *
     * @category Data
     * @param {object} node Node object.
     * @return {object} Node object.
     */
    data.selectNode = function(node) {
        if (!node.itree.state.selected) {
            // Batch selection changes
            api.dom.batch();
            data.deselectAll();
            node.itree.state.selected = true;

            // Emit this event
            api.events.emit('node.selected', node);

            // Mark hierarchy dirty and apply
            api.dom.markNodeDirty(node);
            api.dom.end();
        }

        return node;
    };

    /**
     * Set a new value for the given property.
     *
     * @param {object} node Node object.
     * @param {string} property Property name.
     * @param {*} value New value.
     * @return {object} Node object.
     */
    data.setNodeProperty = function(node, property, value) {
        node[property] = value;
        api.dom.markNodeDirty(node);

        return node;
    };

    return data;
};
