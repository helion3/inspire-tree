'use strict';

// Libs
import * as _ from 'lodash';
import { collectionToModel } from './lib/collection-to-model';
import { EventEmitter2 } from 'eventemitter2';
import { Promise } from 'es6-promise';
import { standardizePromise } from './lib/standardize-promise';
import { TreeNode } from './treenode';
import { TreeNodes } from './treenodes';

// CSS
require('./scss/tree.scss');

/**
 * Maps a method to the root TreeNodes collection.
 *
 * @private
 * @param {InspireTree} tree Tree instance.
 * @param {string} method Method name.
 * @param {arguments} args Proxied arguments.
 * @return {mixed} Proxied return value.
 */
function map(tree, method, args) {
    return tree.model[method].apply(tree.model, args);
}

/**
 * Represents a singe tree instance.
 *
 * @category Tree
 * @return {InspireTree} Tree instance.
 */
export default class InspireTree extends EventEmitter2 {
    constructor(opts) {
        super();

        var tree = this;

        // Init properties
        tree._lastSelectedNode;
        tree._muted = false;
        tree.allowsLoadEvents = false;
        tree.dom = false;
        tree.initialized = false;
        tree.isDynamic = false;
        tree.model = new TreeNodes(tree);
        tree.opts = opts;
        tree.preventDeselection = false;

        // Assign defaults
        tree.config = _.defaultsDeep({}, opts, {
            allowLoadEvents: [],
            contextMenu: false,
            dragTargets: false,
            editable: false,
            editing: {
                add: false,
                edit: false,
                remove: false
            },
            nodes: {
                resetStateOnRestore: true
            },
            renderer: false,
            search: false,
            selection: {
                allow: _.noop,
                autoDeselect: true,
                autoSelectChildren: false,
                disableDirectDeselection: false,
                mode: 'default',
                multiple: false,
                require: false
            },
            showCheckboxes: false,
            sort: false,
            tabindex: -1
        });

        // If checkbox mode, we must force auto-selecting children
        if (tree.config.selection.mode === 'checkbox') {
            tree.config.selection.autoSelectChildren = true;
            tree.config.selection.autoDeselect = false;

            if (!_.isBoolean(opts.showCheckboxes)) {
                tree.config.showCheckboxes = true;
            }
        }

        // If auto-selecting children, we must force multiselect
        if (tree.config.selection.autoSelectChildren) {
            tree.config.selection.multiple = true;
        }

        // Treat editable as full edit mode
        if (opts.editable && !opts.editing) {
            tree.config.editing.add = true;
            tree.config.editing.edit = true;
            tree.config.editing.remove = true;
        }

        // Init the default state for nodes
        tree.defaultState = {
            collapsed: true,
            editable: _.get(tree, 'config.editing.edit'),
            editing: false,
            focused: false,
            hidden: false,
            indeterminate: false,
            loading: false,
            removed: false,
            selectable: true,
            selected: false
        };

        // Cache some configs
        tree.allowsLoadEvents = _.isArray(tree.config.allowLoadEvents) && tree.config.allowLoadEvents.length > 0;
        tree.isDynamic = _.isFunction(tree.config.data);

        // Override emitter so we can better control flow
        var emit = tree.emit;
        tree.emit = function() {
            if (!tree.muted()) {
                // Duck-type for a DOM event
                if (_.isFunction(_.get(arguments, '[1].preventDefault'))) {
                    var event = arguments[1];
                    event.treeDefaultPrevented = false;
                    event.preventTreeDefault = function() {
                        event.treeDefaultPrevented = true;
                    };
                }

                emit.apply(tree, arguments);
            }
        };

        // Webpack has a DOM boolean that when false,
        // allows us to exclude this library from our build.
        // For those doing their own rendering, it's useless.
        if (DOM) {
            tree.dom = new (require('./dom'))(tree);
        }

        // Validation
        if (tree.dom && (!_.isObject(opts) || !opts.target)) {
            throw new TypeError('Property "target" is required, either an element or a selector.');
        }

        // Load custom/empty renderer
        if (!tree.dom) {
            var renderer = _.isFunction(tree.config.renderer) ? tree.config.renderer(tree) : {};
            tree.dom = _.defaults(renderer, {
                applyChanges: _.noop,
                attach: _.noop,
                batch: _.noop,
                end: _.noop
            });
        }

        // Connect to our target DOM element
        tree.dom.attach(tree.config.target);

        // Load initial user data
        if (tree.config.data) {
            tree.load(tree.config.data).catch(function(err) {
                // Proxy initial errors. At this point we should never consume them
                setTimeout(function() {
                    throw err;
                });
            });
        }

        tree.initialized = true;
    }

    /**
     * Adds a new node to this collection. If a sort
     * method is configured, the node will be added
     * in the appropriate order.
     *
     * @category Tree
     * @param {object} node Node
     * @return {TreeNode} Node object.
     */
    addNode() {
        return map(this, 'addNode', arguments);
    }

    /**
     * Add nodes.
     *
     * @category Tree
     * @param {array} nodes Array of node objects.
     * @return {TreeNodes} Added node objects.
     */
    addNodes(nodes) {
        var tree = this;
        tree.dom.batch();

        var newNodes = new TreeNodes(this);
        _.each(nodes, function(node) {
            newNodes.push(tree.addNode(node));
        });

        tree.dom.end();

        return newNodes;
    }

    /**
     * Query for all available nodes.
     *
     * @category Tree
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    available() {
        return map(this, 'available', arguments);
    }

    /**
     * Blur children in this collection.
     *
     * @category Tree
     * @return {TreeNodes} Array of node objects.
     */
    blur() {
        return map(this, 'blur', arguments);
    }

    /**
     * Blur all children (deeply) in this collection.
     *
     * @category Tree
     * @return {TreeNodes} Array of node objects.
     */
    blurDeep() {
        return map(this, 'blurDeep', arguments);
    }

    /**
     * Compares any number of TreeNode objects and returns
     * the minimum and maximum (starting/ending) nodes.
     *
     * @category Tree
     * @return {array} Array with two TreeNode objects.
     */
    boundingNodes() {
        var pathMap = _.transform(arguments, function(map, node) {
            map[node.indexPath().replace(/\./g, '')] = node;
        }, {});

        var paths = _.sortBy(Object.keys(pathMap));
        return [
            _.get(pathMap, _.head(paths)),
            _.get(pathMap, _.tail(paths))
        ];
    }

    /**
     * Get if the tree will auto-deselect currently selected nodes
     * when a new selection is made.
     *
     * @category Tree
     * @return {boolean} If tree will auto-deselect nodes.
     */
    canAutoDeselect() {
        return this.config.selection.autoDeselect && !this.preventDeselection;
    }

    /**
     * Clean children in this collection.
     *
     * @category Tree
     * @return {TreeNodes} Array of node objects.
     */
    clean() {
        return map(this, 'clean', arguments);
    }

    /**
     * Shows all nodes and collapses parents.
     *
     * @category Tree
     * @return {Tree} Tree instance.
     */
    clearSearch() {
        return this.showDeep().collapseDeep().tree();
    }

    /**
     * Clones (deep) the array of nodes.
     *
     * Note: Cloning will *not* clone the context pointer.
     *
     * @category Tree
     * @return {TreeNodes} Array of cloned nodes.
     */
    clone() {
        return map(this, 'clone', arguments);
    }

    /**
     * Collapse children in this collection.
     *
     * @category Tree
     * @return {TreeNodes} Array of node objects.
     */
    collapse() {
        return map(this, 'collapse', arguments);
    }

    /**
     * Query for all collapsed nodes.
     *
     * @category Tree
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    collapsed() {
        return map(this, 'collapsed', arguments);
    }

    /**
     * Collapse all children (deeply) in this collection.
     *
     * @category Tree
     * @return {TreeNodes} Array of node objects.
     */
    collapseDeep() {
        return map(this, 'collapseDeep', arguments);
    }

    /**
     * Concat nodes like an Array would.
     *
     * @category Tree
     * @param {TreeNodes} nodes Array of nodes.
     * @return {TreeNodes} Resulting node array.
     */
    concat() {
        return map(this, 'concat', arguments);
    }

    /**
     * Copies nodes to a new tree instance.
     *
     * @category Tree
     * @param {boolean} hierarchy Include necessary ancestors to match hierarchy.
     * @return {object} Methods to perform action on copied nodes.
     */
    copy() {
        return map(this, 'copy', arguments);
    }

    /**
     * Returns deepest nodes from this array.
     *
     * @category Tree
     * @return {TreeNodes} Array of node objects.
     */
    deepest() {
        return map(this, 'deepest', arguments);
    }

    /**
     * Deselect children in this collection.
     *
     * @category Tree
     * @return {TreeNodes} Array of node objects.
     */
    deselect() {
        return map(this, 'deselect', arguments);
    }

    /**
     * Deselect all children (deeply) in this collection.
     *
     * @category Tree
     * @return {TreeNodes} Array of node objects.
     */
    deselectDeep() {
        return map(this, 'deselectDeep', arguments);
    }

    /**
     * Disable auto-deselection of currently selected nodes.
     *
     * @category Tree
     * @return {Tree} Tree instance.
     */
    disableDeselection() {
        if (this.config.selection.multiple) {
            this.preventDeselection = true;
        }

        return this;
    }

    /**
     * Iterate every TreeNode in this collection.
     *
     * @category Tree
     * @param {function} iteratee Iteratee invoke for each node.
     * @return {TreeNodes} Array of node objects.
     */
    each() {
        return map(this, 'each', arguments);
    }

    /**
     * Query for all editable nodes.
     *
     * @category Tree
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    editable() {
        return map(this, 'editable', arguments);
    }

    /**
     * Query for all nodes in editing mode.
     *
     * @category Tree
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    editing() {
        return map(this, 'editing', arguments);
    }

    /**
     * Enable auto-deselection of currently selected nodes.
     *
     * @category Tree
     * @return {Tree} Tree instance.
     */
    enableDeselection() {
        this.preventDeselection = false;

        return this;
    }

    /**
     * Expand children in this collection.
     *
     * @category Tree
     * @return {TreeNodes} Array of node objects.
     */
    expand() {
        return map(this, 'expand', arguments);
    }

    /**
     * Recursively expands all nodes, loading all dynamic calls.
     *
     * @category Tree
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    expandDeep() {
        return map(this, 'expandDeep', arguments);
    }

    /**
     * Query for all expanded nodes.
     *
     * @category Tree
     * @return {Promise} Promise resolved only when all children have loaded and expanded.
     */
    expanded() {
        return map(this, 'expanded', arguments);
    }

    /**
     * Returns a cloned hierarchy of all nodes matching a predicate.
     *
     * Because it filters deeply, we must clone all nodes so that we
     * don't affect the actual node array.
     *
     * @category Tree
     * @param {string|function} predicate State flag or custom function.
     * @return {TreeNodes} Array of node objects.
     */
    extract() {
        return map(this, 'extract', arguments);
    }

    /**
     * Returns nodes which match a predicate.
     *
     * @category Tree
     * @param {string|function} predicate State flag or custom function.
     * @return {TreeNodes} Array of node objects.
     */
    filter() {
        return map(this, 'filter', arguments);
    }

    /**
     * Flattens a hierarchy, returning only node(s) matching the
     * expected state or predicate function.
     *
     * @category Tree
     * @param {string|function} predicate State property or custom function.
     * @return {TreeNodes} Flat array of matching nodes.
     */
    flatten() {
        return map(this, 'flatten', arguments);
    }

    /**
     * Query for all focused nodes.
     *
     * @category Tree
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    focused() {
        return map(this, 'focused', arguments);
    }

    /**
     * Get a specific node in the collection, or undefined if it doesn't exist.
     *
     * @category Tree
     * @param {int} index Numeric index of requested node.
     * @return {TreeNode} Node object. Undefined if invalid index.
     */
    get() {
        return map(this, 'get', arguments);
    }

    /**
     * Query for all hidden nodes.
     *
     * @category Tree
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    hidden() {
        return map(this, 'hidden', arguments);
    }

    /**
     * Hide children in this collection.
     *
     * @category Tree
     * @return {TreeNodes} Array of node objects.
     */
    hide() {
        return map(this, 'hide', arguments);
    }

    /**
     * Hide all children (deeply) in this collection.
     *
     * @category Tree
     * @return {TreeNodes} Array of node objects.
     */
    hideDeep() {
        return map(this, 'hideDeep', arguments);
    }

    /**
     * Query for all indeterminate nodes.
     *
     * @category Tree
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    indeterminate() {
        return map(this, 'indeterminate', arguments);
    }

    /**
     * Insert a new node at a given position.
     *
     * @category Tree
     * @param {integer} index Index at which to insert the node.
     * @param {object} object Raw node object or TreeNode.
     * @return {TreeNode} Node object.
     */
    insertAt() {
        return map(this, 'insertAt', arguments);
    }

    /**
     * Invoke method(s) on each node.
     *
     * @category Tree
     * @param {string|array} methods Method name(s).
     * @return {TreeNodes} Array of node objects.
     */
    invoke() {
        return map(this, 'invoke', arguments);
    }

    /**
     * Invoke method(s) deeply.
     *
     * @category Tree
     * @param {string|array} methods Method name(s).
     * @return {TreeNodes} Array of node objects.
     */
    invokeDeep() {
        return map(this, 'invokeDeep', arguments);
    }

    /**
     * Check if an object is a TreeNode.
     *
     * @category Tree
     * @param {object} object Object
     * @return {boolean} If object is a TreeNode.
     */
    isNode(object) {
        return (object instanceof TreeNode);
    }

    /**
     * Get the most recently selected node, if any.
     *
     * @category Tree
     * @return {TreeNode} Last selected node, or undefined.
     */
    lastSelectedNode() {
        return this._lastSelectedNode;
    }

    /**
     * Loads tree. Accepts an array or a promise.
     *
     * @category Tree
     * @param {array|function} loader Array of nodes, or promise resolving an array of nodes.
     * @return {Promise} Promise resolved upon successful load, rejected on error.
     * @example
     *
     * tree.load($.getJSON('nodes.json'));
     */
    load(loader) {
        var tree = this;

        var promise = new Promise(function(resolve, reject) {
            var complete = function(nodes) {
                // Delay event for synchronous loader. Otherwise it fires
                // before the user has a chance to listen.
                if (!tree.initialized && _.isArray(nodes)) {
                    setTimeout(function() {
                        tree.emit('data.loaded', nodes);
                    });
                }
                else {
                    tree.emit('data.loaded', nodes);
                }

                // Clear and call rendering on existing data
                if (tree.model.length > 0) {
                    tree.removeAll();
                }

                tree.model = collectionToModel(tree, nodes);

                if (tree.config.selection.require && !tree.selected().length) {
                    tree.selectFirstAvailableNode();
                }

                // Delay event for synchronous loader
                if (!tree.initialized && _.isArray(nodes)) {
                    setTimeout(function() {
                        tree.emit('model.loaded', tree.model);
                    });
                }
                else {
                    tree.emit('model.loaded', tree.model);
                }

                resolve(tree.model);

                tree.dom.applyChanges();

                if (_.isFunction(tree.dom.scrollSelectedIntoView)) {
                    tree.dom.scrollSelectedIntoView();
                }
            };

            // Data given already as an array
            if (_.isArrayLike(loader)) {
                complete(loader);
            }

            // Data loader requires a caller/callback
            else if (_.isFunction(loader)) {
                var resp = loader(null, complete, reject);

                // Loader returned its own object
                if (resp) {
                    loader = resp;
                }
            }

            // Data loader is likely a promise
            if (_.isObject(loader)) {
                standardizePromise(loader).then(complete).catch(reject);
            }

            else {
                error(new Error('Invalid data loader.'));
            }
        });

        // Copy to event listeners
        promise.catch(function(err) {
            tree.emit('data.loaderror', err);
        });

        return promise;
    }

    /**
     * Query for all loading nodes.
     *
     * @category Tree
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    loading() {
        return map(this, 'loading', arguments);
    }

    /*
     * Pause events.
     *
     * @category Tree
     * @param {array} events Event names to mute.
     * @return {Tree} Tree instance.
     */
    mute(events) {
        if (_.isString(events) || _.isArray(events)) {
            this._muted = _.castArray(events);
        }
        else {
            this._muted = true;
        }

        return this;
    }

    /**
     * Get current mute settings.
     *
     * @category Tree
     * @return {boolean|array} Muted events. If all, true.
     */
    muted() {
        return this._muted;
    }

    /**
     * Get a node.
     *
     * @category Tree
     * @param {string|number} id ID of node.
     * @return {TreeNode} Node object.
     */
    node() {
        return map(this, 'node', arguments);
    }

    /**
     * Get all nodes in a tree, or nodes for an array of IDs.
     *
     * @category Tree
     * @param {array} refs Array of ID references.
     * @return {TreeNodes} Array of node objects.
     * @example
     *
     * var all = tree.nodes()
     * var some = tree.nodes([1, 2, 3])
     */
    nodes() {
        return map(this, 'nodes', arguments);
    }

    /**
     * Base recursion function for a collection or node.
     *
     * Returns false if execution should cease.
     *
     * @private
     * @param {function} iteratee Iteratee function
     * @return {TreeNodes} Resulting nodes.
     */
    recurseDown() {
        return map(this, 'recurseDown', arguments);
    }

    /**
     * Reloads/re-executes the original data loader.
     *
     * @category Tree
     * @return {Promise} Load method promise.
     */
    reload() {
        return this.load(this.opts.data || this.config.data);
    }

    /**
     * Removes all nodes.
     *
     * @category Tree
     * @return {Tree} Tree instance.
     */
    removeAll() {
        this.model = new TreeNodes(this);
        this.dom.applyChanges();

        return this;
    }

    /**
     * Query for all soft-removed nodes.
     *
     * @category Tree
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    removed() {
        return map(this, 'removed', arguments);
    }

    /**
     * Restore children in this collection.
     *
     * @category Tree
     * @return {TreeNodes} Array of node objects.
     */
    restore() {
        return map(this, 'restore', arguments);
    }

    /**
     * Restore all children (deeply) in this collection.
     *
     * @category Tree
     * @return {TreeNodes} Array of node objects.
     */
    restoreDeep() {
        return map(this, 'restoreDeep', arguments);
    }

    /**
     * Search nodes, showing only those that match and the necessary hierarchy.
     *
     * @category Tree
     * @param {*} query Search string, RegExp, or function.
     * @return {TreeNodes} Array of matching node objects.
     */
    search(query) {
        var tree = this;
        var matches = new TreeNodes(this);

        var custom = tree.config.search;
        if (_.isFunction(custom)) {
            return custom(
                query,
                function resolver(nodes) {
                    tree.dom.batch();

                    tree.hideDeep();
                    _.each(nodes, function(node) {
                        tree.addNode(node);
                    });

                    tree.dom.end();
                },
                function rejecter(err) {
                    tree.emit('tree.loaderror', err);
                }
            );
        }

        // Don't search if query empty
        if (!query || (_.isString(query) && _.isEmpty(query))) {
            return tree.clearSearch();
        }

        if (_.isString(query)) {
            query = new RegExp(query, 'i');
        }

        var predicate;
        if (_.isRegExp(query)) {
            predicate = function(node) {
                return query.test(node.text);
            };
        }
        else {
            predicate = query;
        }

        tree.dom.batch();

        tree.model.recurseDown(function(node) {
            if (!node.removed()) {
                var match = predicate(node);
                var wasHidden = node.hidden();
                node.state('hidden', !match);

                // If hidden state will change
                if (wasHidden !== node.hidden()) {
                    node.markDirty();
                }

                if (match) {
                    matches.push(node);
                    node.expandParents();
                }
            }
        });

        tree.dom.end();

        return matches;
    }

    /**
     * Select children in this collection.
     *
     * @category Tree
     * @return {TreeNodes} Array of node objects.
     */
    select() {
        return map(this, 'select', arguments);
    }

    /**
     * Query for all selectable nodes.
     *
     * @category Tree
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    selectable() {
        return map(this, 'selectable', arguments);
    }

    /**
     * Select all nodes between a start and end node.
     * Starting node must have a higher index path so we can work down to endNode.
     *
     * @category Tree
     * @param {TreeNode} startNode Starting node
     * @param {TreeNode} endNode Ending node
     * @return {Tree} Tree instance.
     */
    selectBetween(startNode, endNode) {
        this.dom.batch();

        var node = startNode.nextVisibleNode();
        while (node) {
            if (node.id === endNode.id) {
                break;
            }

            node.select();

            node = node.nextVisibleNode();
        }

        this.dom.end();

        return this;
    };

    /**
     * Select all children (deeply) in this collection.
     *
     * @category Tree
     * @return {TreeNodes} Array of node objects.
     */
    selectDeep() {
        return map(this, 'selectDeep', arguments);
    }

    /**
     * Query for all selected nodes.
     *
     * @category Tree
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    selected() {
        return map(this, 'selected', arguments);
    }

    /**
     * Select the first available node at the root level.
     *
     * @category Tree
     * @return {TreeNode} Selected node object.
     */
    selectFirstAvailableNode() {
        var node = this.model.filter('available').get(0);
        if (node) {
            node.select();
        }

        return node;
    };

    /**
     * Show children in this collection.
     *
     * @category Tree
     * @return {TreeNodes} Array of node objects.
     */
    show() {
        return map(this, 'show', arguments);
    }

    /**
     * Show all children (deeply) in this collection.
     *
     * @category Tree
     * @return {TreeNodes} Array of node objects.
     */
    showDeep() {
        return map(this, 'showDeep', arguments);
    }

    /**
     * Soft-remove children in this collection.
     *
     * @category Tree
     * @return {TreeNodes} Array of node objects.
     */
    softRemove() {
        return map(this, 'softRemove', arguments);
    }

    /**
     * Sorts all TreeNode objects in this collection.
     *
     * If no custom sorter given, the configured "sort" value will be used.
     *
     * @category Tree
     * @param {string|function} sorter Sort function or property name.
     * @return {TreeNodes} Array of node obejcts.
     */
    sort() {
        return map(this, 'sort', arguments);
    }

    /**
     * Set state values for nodes in this collection.
     *
     * @category Tree
     * @param {string} name Property name.
     * @param {boolean} newVal New value, if setting.
     * @return {TreeNodes} Array of node objects.
     */
    state() {
        return map(this, 'state', arguments);
    }

    /**
     * Set state values for nodes in this collection.
     *
     * @category Tree
     * @param {string} name Property name.
     * @param {boolean} newVal New value, if setting.
     * @return {TreeNodes} Array of node objects.
     */
    stateDeep() {
        return map(this, 'stateDeep', arguments);
    }

    /**
     * Returns a native Array of nodes.
     *
     * @category Tree
     * @return {array} Array of node objects.
     */
    toArray() {
        return map(this, 'toArray', arguments);
    }

    /**
     * Resume events.
     *
     * @category Tree
     * @param {array} events Events to unmute.
     * @return {Tree} Tree instance.
     */
    unmute(events) {
        // Diff array and set to false if we're now empty
        if (_.isString(events) || _.isArray(events)) {
            this._muted = _.difference(this._muted, _.castArray(events));
            if (!this._muted.length) {
                this._muted = false;
            }
        }
        else {
            this._muted = false;
        }

        return this;
    };

    /**
     * Query for all visible nodes.
     *
     * @category Tree
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    visible() {
        return map(this, 'visible', arguments);
    }
}
