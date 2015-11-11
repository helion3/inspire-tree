'use strict';

// Libs
var assign = require('lodash.assign');
var cloneDeep = require('lodash.clonedeep');
var cuid = require('cuid');
var defaultsDeep = require('lodash.defaultsdeep');
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
     * @param {object} node Node object.
     * @return {void}
     */
    function expandParents(node) {
        if (node.itree.parent) {
            node = node.itree.parent;

            node.itree.state.collapsed = false;
            api.events.emit('node.expanded', node);

            expandParents(node);
        }
    }

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
     * Merge a node into an existing context - a model
     * or another node's children. If the ID exists
     * the node is skipped and we try its children.
     *
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
     * @param {object} object Source object
     * @param {object} parent Pointer to parent object.
     * @return {object} Final object
     */
    function objectToModel(object, parent) {
        // Create or type-ensure ID
        object.id = object.id || generateId();
        if (!isString(object.id)) {
            object.id = object.id.toString();
        }

        // Add all itree values
        object.itree = defaultsDeep(object.itree || {}, {
            state: {
                collapsed: true,
                hidden: false,
                selected: false
            }
        });

        // Save parent, if any.
        object.itree.parent = parent;

        if (isArray(object.children) && !isEmpty(object.children)) {
            object.children = collectionToModel(object.children, object);
        }

        // Wrap
        object = assign(new TreeNode(), object);

        return object;
    };

    /**
     * Iterate nodes recursively.
     *
     * @param {array|object} collection Array of nodes or node object.
     * @param {function} iteratee Iteratee function.
     * @return {array} Resulting node array.
     */
    function recurse(collection, iteratee) {
        // Recurse each element in this array
        if (isArray(collection)) {
            each(collection, function(element, i) {
                collection[i] = recurse(element, iteratee);
            });
        }

        else if (isObject(collection)) {
            collection = iteratee(collection);

            // Recurse children
            if (isArray(collection.children) && !isEmpty(collection.children)) {
                collection.children = recurse(collection.children, iteratee);
            }
        }

        return collection;
    };

    /**
     * Ensure all parent nodes are visible.
     *
     * @param {object} node Node object.
     * @return {void}
     */
    function showParents(node) {
        if (node.itree.parent) {
            node = node.itree.parent;

            node.itree.state.hidden = false;
            api.events.emit('node.shown', node);

            showParents(node);
        }
    }

    var batching = false;
    var rerender = function() {
        // Never rerender when until batch complete
        if (batching) {
            return;
        }

        api.dom.renderNodes(model);
    };

    var data = this;
    var model = [];

    /**
     * Add new node as a child of another.
     *
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

        rerender();

        return child;
    };

    /**
     * Add a node.
     *
     * @param {object} node Node object.
     * @return {object} Node object.
     */
    data.addNode = function(node) {
        node = objectToModel(node);
        var newNodes = mergeNode(model, node);

        if (newNodes.length) {
            api.events.emit('node.added', node);
        }

        rerender();

        return node;
    };

    /**
     * Add nodes.
     *
     * @param {array} nodes Array of node objects.
     * @return {array} Added node objects.
     */
    data.addNodes = function(nodes) {
        data.batch();

        transform(nodes, function(newNodes, node) {
            newNodes.push(data.addNode(node));
        });

        data.end();

        return nodes;
    };

    /**
     * Disable rendering in preparation for multiple changes.
     *
     * @return {void}
     */
    data.batch = function() {
        batching = true;
    };

    /**
     * Shows all nodes and collapses parents.
     *
     * @return {void}
     */
    data.clearSearch = function() {
        // @todo
    };

    /**
     * Expand immediate children for this node, if any.
     *
     * @param {object} node Node object.
     * @return {object} Node object.
     */
    data.collapseNode = function(node) {
        if (!node.itree.state.collapsed && !isEmpty(get(node, 'children'))) {
            node.itree.state.collapsed = true;

            api.events.emit('node.collapsed', node);

            rerender();
        }

        return node;
    };

    /**
     * Copies all parents of a node.
     *
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
     * @param {array} nodes Array of node objects.
     * @param {boolean} hierarchy Include necessary ancestors to match hierarchy.
     * @return {void}
     */
    data.copyNodes = function(nodes, hierarchy) {
        return {

            /**
             * Sets a destination.
             *
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
     * @return {void}
     */
    data.deselectAll = function() {
        data.batch();
        recurse(model, data.deselectNode);
        data.end();
    };

    /**
     * Deselect a node.
     *
     * @param {object} node Node object.
     * @return {pbject} Node object.
     */
    data.deselectNode = function(node) {
        if (node.itree.state.selected) {
            node.itree.state.selected = false;

            api.events.emit('node.deselected', node);

            rerender();
        }

        return node;
    };

    /**
     * Permit rerendering of batched changes.
     *
     * @return {void}
     */
    data.end = function() {
        batching = false;
        rerender();
    };

    /**
     * Expand immediate children for this node, if any.
     *
     * @param {object} node Node object.
     * @return {object} Node object.
     */
    data.expandNode = function(node) {
        var isDynamic = get(api, 'config.dynamic');
        var allow = (!isEmpty(get(node, 'children')) || isDynamic);

        if (allow && node.itree.state.collapsed) {
            node.itree.state.collapsed = false;

            api.events.emit('node.expanded', node);

            if (isDynamic) {
                data.loadChildren(node);
            }
            else {
                rerender();
            }
        }

        return node;
    };

    /**
     * Clones a node object and removes any
     * itree instance information/state.
     *
     * @param {array} node Node object
     * @return {array} Cloned/modified node object.
     */
    data.exportNode = function(node) {
        var nodeClone = cloneDeep(node);

        recurse(nodeClone, function(node) {
            node.itree = null;
            return node;
        });

        return nodeClone;
    };

    /**
     * Clones an array of node objects and removes any
     * itree instance information/state.
     *
     * @param {array} nodes Array of node objects.
     * @return {array} Cloned/modified node objects.
     */
    data.exportNodes = function(nodes) {
        var nodeClones = cloneDeep(nodes);

        recurse(nodeClones, function(node) {
            node.itree = null;
            return node;
        });

        return nodeClones;
    };

    /**
     * Flattens a hierarchy, returning only node(s) with the
     * expected state, for operations which must exclude parents.
     *
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
     * Get a node.
     *
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
     * @return {array} Array of node objects.
     */
    data.getNodes = function() {
        return model;
    };

    /**
     * Returns parent nodes for a node. Excludes any siblings.
     *
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
     * @param {array} nodes Array of node objects to search within.
     * @return {array} Selected nodes.
     */
    data.getSelectedNodes = function(nodes) {
        return data.flattenNodes((nodes || model), 'selected');
    };

    /**
     * Hide a node.
     *
     * @param {object} node Node object.
     * @return {object} Node object.
     */
    data.hideNode = function(node) {
        if (!node.itree.state.hidden) {
            node.itree.state.hidden = true;

            api.events.emit('node.hidden', node);

            // Update children
            if (get(node, 'children')) {
                data.hideNodes(node.children);
            }

            rerender();
        }

        return node;
    };

    /**
     * Hide all nodes in an array.
     *
     * @param {array} nodes Array of node objects.
     * @return {array} Array of node objects.
     */
    data.hideNodes = function(nodes) {
        data.batch();
        each(nodes, data.hideNode);
        data.end();
        return nodes;
    };

    /**
     * Hides all nodes.
     *
     * @return {void}
     */
    data.hideAll = function() {
        data.hideNodes(model);
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
        var resolve = function(nodes) {
            model = collectionToModel(nodes);
            api.events.emit('data.loaded', model);
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
     * @param {object} node Node object.
     * @return {void}
     */
    data.loadChildren = function(node) {
        var isDynamic = get(api, 'config.dynamic');
        if (isDynamic) {
            api.config.data(
                node,
                function resolver(results) {
                    node.children = collectionToModel(results);
                    rerender();
                },
                function rejecter(err) {
                    node.children = [];
                    api.events.emit('data.loaderror', err);
                    rerender();
                }
            );
        }
    };

    /**
     * Removes all nodes.
     *
     * @return {void}
     */
    data.removeAll = function() {
        model = [];
        rerender();
    };

    /**
     * Remove a node from the tree.
     *
     * @param {object} node Node object.
     * @return {void}
     */
    data.removeNode = function(node) {
        var context = (node.parent ? node.parent.children : model);
        remove(context, { id: node.id });

        api.events.emit('node.removed', data.exportNode(node));

        rerender();
    };

    /**
     * Search nodes, showing only those that match and the necessary hierarchy.
     *
     * @param {*} query Search string, RegExp, or function.
     * @return {void}
     */
    data.search = function(query) {
        var custom = get(api, 'config.search');
        if (isFunction(custom)) {
            return custom(
                query,
                function resolver(nodes) {
                    data.batch();

                    data.hideAll();
                    each(nodes, function(node) {
                        mergeNode(model, node);
                    });

                    data.end();
                },
                function rejecter(err) {
                    api.events.emit('data.loaderror', err);
                }
            );
        }

        var predicate;

        // Don't search if query empty
        if (isString(query) && isEmpty(query)) {
            return data.clearSearch();
        }

        if (isString(query)) {
            predicate = function(node) {
                return node.title === query;
            };
        }
        else if (isRegExp(query)) {
            predicate = function(node) {
                return query.test(node.title);
            };
        }

        if (!isFunction(predicate)) {
            throw new TypeError('Search predicate must be a string, RegExp, or function.');
        }

        recurse(model, function(node) {
            var match = predicate(node);
            node.itree.state.hidden = !match;

            if (match) {
                showParents(node);
                expandParents(node);
            }

            return node;
        });

        rerender();
    };

    /**
     * Select a node. If already selected, no change made.
     *
     * @param {object} node Node object.
     * @return {object} Node object.
     */
    data.selectNode = function(node) {
        if (!node.itree.state.selected) {
            data.deselectAll();

            node.itree.state.selected = true;

            api.events.emit('node.selected', node);

            rerender();
        }

        return node;
    };

    /**
     * Hide a node.
     *
     * @param {object} node Node object.
     * @return {object} Node object.
     */
    data.showNode = function(node) {
        if (node.itree.state.hidden) {
            node.itree.state.hidden = false;

            api.events.emit('node.shown', node);

            rerender();
        }

        return node;
    };

    return data;
};
