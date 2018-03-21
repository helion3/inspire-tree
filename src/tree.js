// Libs
import * as _ from 'lodash';
import { collectionToModel } from './lib/collection-to-model';
import { EventEmitter2 } from 'eventemitter2';
import { objectToNode } from './lib/object-to-node';
import { Promise } from 'es6-promise';
import { standardizePromise } from './lib/standardize-promise';
import TreeNode from './treenode';
import TreeNodes from './treenodes';
import uuidV4 from 'uuid/v4';

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
 * @return {InspireTree} Tree instance.
 */
class InspireTree extends EventEmitter2 {
    constructor(opts) {
        super();

        let tree = this;

        // Init properties
        tree._lastSelectedNode;
        tree._muted = false;
        tree.allowsLoadEvents = false;
        tree.batching = 0;
        tree.id = uuidV4();
        tree.initialized = false;
        tree.isDynamic = false;
        tree.opts = opts;
        tree.preventDeselection = false;

        // Assign defaults
        tree.config = _.defaultsDeep({}, opts, {
            allowLoadEvents: [],
            checkbox: {
                autoCheckChildren: true
            },
            contextMenu: false,
            data: false,
            editable: false,
            editing: {
                add: false,
                edit: false,
                remove: false
            },
            nodes: {
                resetStateOnRestore: true
            },
            pagination: {
                limit: -1
            },
            search: {
                matcher: false,
                matchProcessor: false
            },
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
            sort: false
        });

        // If checkbox mode, we must force auto-selecting children
        if (tree.config.selection.mode === 'checkbox') {
            tree.config.selection.autoSelectChildren = true;

            // In checkbox mode, checked=selected
            tree.on('node.checked', (node) => {
                if (!node.selected()) {
                    node.select(true);
                }
            });

            tree.on('node.selected', (node) => {
                if (!node.checked()) {
                    node.check(true);
                }
            });

            tree.on('node.unchecked', (node) => {
                if (node.selected()) {
                    node.deselect(true);
                }
            });

            tree.on('node.deselected', (node) => {
                if (node.checked()) {
                    node.uncheck(true);
                }
            });
        }

        // If auto-selecting children, we must force multiselect
        if (tree.config.selection.autoSelectChildren) {
            tree.config.selection.multiple = true;
            tree.config.selection.autoDeselect = false;
        }

        // Treat editable as full edit mode
        if (opts.editable && !opts.editing) {
            tree.config.editing.add = true;
            tree.config.editing.edit = true;
            tree.config.editing.remove = true;
        }

        // Support simple config for search
        if (_.isFunction(opts.search)) {
            tree.config.search = {
                matcher: opts.search,
                matchProcessor: false
            };
        }

        // Init the default state for nodes
        tree.defaultState = {
            collapsed: true,
            editable: _.get(tree, 'config.editing.edit'),
            editing: false,
            draggable: true,
            'drop-target': true,
            focused: false,
            hidden: false,
            indeterminate: false,
            loading: false,
            matched: false,
            removed: false,
            rendered: false,
            selectable: true,
            selected: false
        };

        // Cache some configs
        tree.allowsLoadEvents = _.isArray(tree.config.allowLoadEvents) && tree.config.allowLoadEvents.length > 0;
        tree.isDynamic = _.isFunction(tree.config.data);

        // Override emitter so we can better control flow
        let emit = tree.emit;
        tree.emit = function(eventName) {
            if (!tree.isEventMuted(eventName)) {
                // Duck-type for a DOM event
                if (_.isFunction(_.get(arguments, '[1].preventDefault'))) {
                    let event = arguments[1];
                    event.treeDefaultPrevented = false;
                    event.preventTreeDefault = () => {
                        event.treeDefaultPrevented = true;
                    };
                }

                emit.apply(tree, arguments);
            }
        };

        // Init the model
        tree.model = new TreeNodes(tree);

        // Load initial user data
        if (tree.config.data) {
            tree.load(tree.config.data);
        }

        tree.initialized = true;
    }

    /**
     * Adds a new node. If a sort method is configured,
     * the node will be added in the appropriate order.
     *
     * @param {object} node Node
     * @return {TreeNode} Node object.
     */
    addNode() {
        return map(this, 'addNode', arguments);
    }

    /**
     * Add nodes.
     *
     * @param {array} nodes Array of node objects.
     * @return {TreeNodes} Added node objects.
     */
    addNodes(nodes) {
        this.batch();

        let newNodes = new TreeNodes(this);
        _.each(nodes, (node) => newNodes.push(this.addNode(node)));

        this.end();

        return newNodes;
    }

    /**
     * Release pending data changes to any listeners.
     *
     * Will skip rendering as long as any calls
     * to `batch` have yet to be resolved,
     *
     * @private
     * @return {void}
     */
    applyChanges() {
        if (this.batching === 0) {
            this.emit('changes.applied');
        }
    }

    /**
     * Query for all available nodes.
     *
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    available() {
        return map(this, 'available', arguments);
    }

    /**
     * Batch multiple changes for listeners (i.e. DOM)
     *
     * @private
     * @return {void}
     */
    batch() {
        if (this.batching < 0) {
            this.batching = 0;
        }

        this.batching++;
    }

    /**
     * Blur children in this collection.
     *
     * @return {TreeNodes} Array of node objects.
     */
    blur() {
        return map(this, 'blur', arguments);
    }

    /**
     * Blur (deeply) all nodes.
     *
     * @return {TreeNodes} Array of node objects.
     */
    blurDeep() {
        return map(this, 'blurDeep', arguments);
    }

    /**
     * Compares any number of TreeNode objects and returns
     * the minimum and maximum (starting/ending) nodes.
     *
     * @return {array} Array with two TreeNode objects.
     */
    boundingNodes() {
        let pathMap = _.transform(arguments, (map, node) => {
            map[node.indexPath().replace(/\./g, '')] = node;
        }, {});

        let [head, ...tail] = _.sortBy(Object.keys(pathMap));

        return [
            _.get(pathMap, head),
            _.get(pathMap, tail)
        ];
    }

    /**
     * Check if the tree will auto-deselect currently selected nodes
     * when a new selection is made.
     *
     * @return {boolean} If tree will auto-deselect nodes.
     */
    canAutoDeselect() {
        return this.config.selection.autoDeselect && !this.preventDeselection;
    }

    /**
     * Query for all checked nodes.
     *
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    checked() {
        return map(this, 'checked', arguments);
    }

    /**
     * Clean nodes.
     *
     * @return {TreeNodes} Array of node objects.
     */
    clean() {
        return map(this, 'clean', arguments);
    }

    /**
     * Clear nodes matched by previous search, restore all nodes and collapse parents.
     *
     * @return {Tree} Tree instance.
     */
    clearSearch() {
        this.matched().state('matched', false);
        return this.showDeep().collapseDeep().tree();
    }

    /**
     * Clones (deeply) the array of nodes.
     *
     * Note: Cloning will *not* clone the context pointer.
     *
     * @return {TreeNodes} Array of cloned nodes.
     */
    clone() {
        return map(this, 'clone', arguments);
    }

    /**
     * Collapse nodes.
     *
     * @return {TreeNodes} Array of node objects.
     */
    collapse() {
        return map(this, 'collapse', arguments);
    }

    /**
     * Query for all collapsed nodes.
     *
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    collapsed() {
        return map(this, 'collapsed', arguments);
    }

    /**
     * Collapse (deeply) all children.
     *
     * @return {TreeNodes} Array of node objects.
     */
    collapseDeep() {
        return map(this, 'collapseDeep', arguments);
    }

    /**
     * Concat multiple TreeNodes arrays.
     *
     * @param {TreeNodes} nodes Array of nodes.
     * @return {TreeNodes} Resulting node array.
     */
    concat() {
        return map(this, 'concat', arguments);
    }

    /**
     * Copy nodes to another tree instance.
     *
     * @param {boolean} hierarchy Include necessary ancestors to match hierarchy.
     * @return {object} Methods to perform action on copied nodes.
     */
    copy() {
        return map(this, 'copy', arguments);
    }

    /**
     * Creates a TreeNode without adding it. If the obj is already a TreeNode it's returned without modification.
     *
     * @param {object} obj Source node object.
     * @return {TreeNode} Node object.
     */
    createNode(obj) {
        return InspireTree.isTreeNode(obj) ? obj : objectToNode(this, obj);
    }

    /**
     * Return deepest nodes.
     *
     * @return {TreeNodes} Array of node objects.
     */
    deepest() {
        return map(this, 'deepest', arguments);
    }

    /**
     * Deselect nodes.
     *
     * @return {TreeNodes} Array of node objects.
     */
    deselect() {
        return map(this, 'deselect', arguments);
    }

    /**
     * Deselect (deeply) all nodes.
     *
     * @return {TreeNodes} Array of node objects.
     */
    deselectDeep() {
        return map(this, 'deselectDeep', arguments);
    }

    /**
     * Disable auto-deselection of currently selected nodes.
     *
     * @return {Tree} Tree instance.
     */
    disableDeselection() {
        if (this.config.selection.multiple) {
            this.preventDeselection = true;
        }

        return this;
    }

    /**
     * Iterate each TreeNode.
     *
     * @param {function} iteratee Iteratee invoke for each node.
     * @return {TreeNodes} Array of node objects.
     */
    each() {
        return map(this, 'each', arguments);
    }

    /**
     * Check if every node passes the given test.
     *
     * @param {function} tester Test each node in this collection,
     * @return {boolean} True if every node passes the test.
     */
    every() {
        return map(this, 'every', arguments);
    }

    /**
     * Query for all editable nodes.
     *
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    editable() {
        return map(this, 'editable', arguments);
    }

    /**
     * Query for all nodes in editing mode.
     *
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    editing() {
        return map(this, 'editing', arguments);
    }

    /**
     * Enable auto-deselection of currently selected nodes.
     *
     * @return {Tree} Tree instance.
     */
    enableDeselection() {
        this.preventDeselection = false;

        return this;
    }

    /**
     * Release the current batch.
     *
     * @private
     * @return {void}
     */
    end() {
        this.batching--;

        if (this.batching === 0) {
            this.applyChanges();
        }
    }

    /**
     * Expand children.
     *
     * @return {TreeNodes} Array of node objects.
     */
    expand() {
        return map(this, 'expand', arguments);
    }

    /**
     * Expand (deeply) all nodes.
     *
     * @return {Promise} Promise resolved when all children have loaded and expanded.
     */
    expandDeep() {
        return map(this, 'expandDeep', arguments);
    }

    /**
     * Query for all expanded nodes.
     *
     * @return {TreeNodes} Array of node objects.
     */
    expanded() {
        return map(this, 'expanded', arguments);
    }

    /**
     * Clone a hierarchy of all nodes matching a predicate.
     *
     * Because it filters deeply, we must clone all nodes so that we
     * don't affect the actual node array.
     *
     * @param {string|function} predicate State flag or custom function.
     * @return {TreeNodes} Array of node objects.
     */
    extract() {
        return map(this, 'extract', arguments);
    }

    /**
     * Filter all nodes matching the given predicate.
     *
     * @param {function} predicate Test function.
     * @return {TreeNodes} Array of node objects.
     */
    filter() {
        return map(this, 'filter', arguments);
    }

    /**
     * Filter all nodes matching the given predicate.
     *
     * @param {string|function} predicate State flag or custom function.
     * @return {TreeNodes} Array of node objects.
     */
    filterBy() {
        return map(this, 'filterBy', arguments);
    }

    /**
     * Flatten and get only node(s) matching the expected state or predicate function.
     *
     * @param {string|function} predicate State property or custom function.
     * @return {TreeNodes} Flat array of matching nodes.
     */
    flatten() {
        return map(this, 'flatten', arguments);
    }

    /**
     * Query for all focused nodes.
     *
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    focused() {
        return map(this, 'focused', arguments);
    }

    /**
     * Iterate each TreeNode.
     *
     * @param {function} iteratee Iteratee invoke for each node.
     * @return {TreeNodes} Array of node objects.
     */
    forEach() {
        return map(this, 'each', arguments);
    }

    /**
     * Get a specific node by its index, or undefined if it doesn't exist.
     *
     * @param {int} index Numeric index of requested node.
     * @return {TreeNode} Node object. Undefined if invalid index.
     */
    get() {
        return map(this, 'get', arguments);
    }

    /**
     * Query for all hidden nodes.
     *
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    hidden() {
        return map(this, 'hidden', arguments);
    }

    /**
     * Hide nodes.
     *
     * @return {TreeNodes} Array of node objects.
     */
    hide() {
        return map(this, 'hide', arguments);
    }

    /**
     * Hide (deeply) all nodes.
     *
     * @return {TreeNodes} Array of node objects.
     */
    hideDeep() {
        return map(this, 'hideDeep', arguments);
    }

    /**
     * Query for all indeterminate nodes.
     *
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    indeterminate() {
        return map(this, 'indeterminate', arguments);
    }

    /**
     * Get the index of the given node.
     *
     * @param {TreeNode} node Root tree node.
     * @return {int} Index of the node.
     */
    indexOf() {
        return map(this, 'indexOf', arguments);
    }

    /**
     * Insert a new node at the given position.
     *
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
     * @param {string|array} methods Method name(s).
     * @return {TreeNodes} Array of node objects.
     */
    invoke() {
        return map(this, 'invoke', arguments);
    }

    /**
     * Invoke method(s) deeply.
     *
     * @param {string|array} methods Method name(s).
     * @return {TreeNodes} Array of node objects.
     */
    invokeDeep() {
        return map(this, 'invokeDeep', arguments);
    }

    /**
     * Check if an event is currently muted.
     *
     * @param {string} eventName Event name.
     * @return {boolean} If event is muted.
     */
    isEventMuted(eventName) {
        if (_.isBoolean(this.muted())) {
            return this.muted();
        }

        return _.includes(this.muted(), eventName);
    }

    /**
     * Check if an object is a Tree.
     *
     * @param {object} object Object
     * @return {boolean} If object is a Tree.
     */
    isTree(object) {
        return (object instanceof InspireTree);
    }

    /**
     * Check if an object is a TreeNode.
     *
     * @param {object} obj Object
     * @return {boolean} If object is a TreeNode.
     */
    static isTreeNode(obj) {
        return obj instanceof TreeNode;
    }

    /**
     * Check if an object is a TreeNodes array.
     *
     * @param {object} obj Object
     * @return {boolean} If object is a TreeNodes array.
     */
    static isTreeNodes(obj) {
        return obj instanceof TreeNodes;
    }

    /**
     * Join nodes into a resulting string.
     *
     * @param {string} separator Separator, defaults to a comma
     * @return {string} Strings from root node objects.
     */
    join() {
        return map(this, 'join', arguments);
    }

    /**
     * Get the most recently selected node, if any.
     *
     * @return {TreeNode} Last selected node, or undefined.
     */
    lastSelectedNode() {
        return this._lastSelectedNode;
    }

    /**
     * Load data. Accepts an array, function, or promise.
     *
     * @param {array|function|Promise} loader Array of nodes, function, or promise resolving an array of nodes.
     * @return {Promise} Promise resolved upon successful load, rejected on error.
     * @example
     *
     * tree.load($.getJSON('nodes.json'));
     */
    load(loader) {
        let promise = new Promise((resolve, reject) => {
            let complete = (nodes, totalNodes) => {
                // A little type-safety for silly situations
                if (!_.isArrayLike(nodes)) {
                    return reject(new TypeError('Loader requires an array-like `nodes` parameter.'));
                }

                // Delay event for synchronous loader. Otherwise it fires
                // before the user has a chance to listen.
                if (!this.initialized && _.isArrayLike(nodes)) {
                    setTimeout(() => {
                        this.emit('data.loaded', nodes);
                    });
                }
                else {
                    this.emit('data.loaded', nodes);
                }

                // Parse newly-loaded nodes
                const newModel = collectionToModel(this, nodes);

                // Concat only if loading is deferred
                if (this.config.deferredLoading) {
                    this.model = this.model.concat(newModel);
                }
                else {
                    this.model = newModel;
                }

                // Set pagination
                this.model._pagination.total = nodes.length;
                if (_.parseInt(totalNodes) > nodes.length) {
                    this.model._pagination.total = _.parseInt(totalNodes);
                }

                // Set pagination totals if resolver failed to provide them
                if (!totalNodes) {
                    this.model.recurseDown((node) => {
                        if (node.hasChildren()) {
                            node.children._pagination.total = node.children.length;
                        }
                    });
                }

                if (this.config.selection.require && !this.selected().length) {
                    this.selectFirstAvailableNode();
                }

                const init = () => {
                    this.emit('model.loaded', this.model);

                    resolve(this.model);

                    this.applyChanges();
                };

                // Delay event for synchronous loader
                if (!this.initialized && _.isArray(nodes)) {
                    setTimeout(init);
                }
                else {
                    init();
                }
            };

            // Data given already as an array
            if (_.isArrayLike(loader)) {
                complete(loader);
            }

            // Data loader requires a caller/callback
            else if (_.isFunction(loader)) {
                let resp = loader(null, complete, reject, this.pagination());

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
        promise.catch((err) => {
            this.emit('data.loaderror', err);
        });

        // Cache to allow access after tree instantiation
        this._loader = {
            promise: promise
        };

        return promise;
    }

    /**
     * Query for all nodes currently loading children.
     *
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    loading() {
        return map(this, 'loading', arguments);
    }

    /**
     * Load additional nodes for the root context.
     *
     * @param {Event} event Click or scroll event if DOM interaction triggered this call.
     * @return {Promise} Resolves with request results.
     */
    loadMore() {
        return map(this, 'loadMore', arguments);
    }

    /**
     * Create a new collection after passing every node through iteratee.
     *
     * @param {function} iteratee Node iteratee.
     * @return {TreeNodes} New array of node objects.
     */
    map() {
        return map(this, 'map', arguments);
    }

    /**
     * Query for all nodes matched in the last search.
     *
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    matched() {
        return map(this, 'matched', arguments);
    }

    /**
     * Move node at a given index to a new index.
     *
     * @param {int} index Current index.
     * @param {int} newIndex New index.
     * @param {TreeNodes} target Target TreeNodes array. Defaults to this.
     * @return {TreeNode} Node object.
     */
    move() {
        return map(this, 'move', arguments);
    }

    /**
     * Pause events.
     *
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
     * @return {boolean|array} Muted events. If all, true.
     */
    muted() {
        return this._muted;
    }

    /**
     * Get a node.
     *
     * @param {string|number} id ID of node.
     * @return {TreeNode} Node object.
     */
    node() {
        return map(this, 'node', arguments);
    }

    /**
     * Get all nodes in a tree, or nodes for an array of IDs.
     *
     * @param {array} refs Array of ID references.
     * @return {TreeNodes} Array of node objects.
     * @example
     *
     * let all = tree.nodes()
     * let some = tree.nodes([1, 2, 3])
     */
    nodes() {
        return map(this, 'nodes', arguments);
    }

    /**
     * Get the root TreeNodes pagination.
     *
     * @return {object} Pagination configuration object.
     */
    pagination() {
        return map(this, 'pagination', arguments);
    }

    /**
     * Pop node in the final index position.
     *
     * @return {TreeNode} Node object.
     */
    pop() {
        return map(this, 'pop', arguments);
    }

    /**
     * Add a TreeNode to the end of the root collection.
     *
     * @param {TreeNode} node Node object.
     * @return {int} The new length
     */
    push() {
        return map(this, 'push', arguments);
    }

    /**
     * Iterate down all nodes and any children.
     *
     * Return false to stop execution.
     *
     * @private
     * @param {function} iteratee Iteratee function
     * @return {TreeNodes} Resulting nodes.
     */
    recurseDown() {
        return map(this, 'recurseDown', arguments);
    }

    /**
     * Reduce nodes.
     *
     * @param {function} iteratee Iteratee function
     * @return {any} Resulting data.
     */
    reduce() {
        return map(this, 'reduce', arguments);
    }

    /**
     * Right-reduce root nodes.
     *
     * @param {function} iteratee Iteratee function
     * @return {any} Resulting data.
     */
    reduceRight() {
        return map(this, 'reduceRight', arguments);
    }

    /**
     * Reload/re-execute the original data loader.
     *
     * @return {Promise} Load method promise.
     */
    reload() {
        this.removeAll();

        return this.load(this.opts.data || this.config.data);
    }

    /**
     * Remove a node.
     *
     * @param {TreeNode} node Node object.
     * @return {TreeNodes} Array of node objects.
     */
    remove() {
        return map(this, 'remove', arguments);
    }

    /**
     * Remove all nodes.
     *
     * @return {Tree} Tree instance.
     */
    removeAll() {
        this.model = new TreeNodes(this);
        this.applyChanges();

        return this;
    }

    /**
     * Query for all soft-removed nodes.
     *
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    removed() {
        return map(this, 'removed', arguments);
    }

    /**
     * Restore nodes.
     *
     * @return {TreeNodes} Array of node objects.
     */
    restore() {
        return map(this, 'restore', arguments);
    }

    /**
     * Restore (deeply) all nodes.
     *
     * @return {TreeNodes} Array of node objects.
     */
    restoreDeep() {
        return map(this, 'restoreDeep', arguments);
    }

    /**
     * Reverse node order.
     *
     * @return {TreeNodes} Reversed array of node objects.
     */
    reverse() {
        return map(this, 'reverse', arguments);
    }

    /**
     * Search nodes, showing only those that match and the necessary hierarchy.
     *
     * @param {*} query Search string, RegExp, or function.
     * @return {TreeNodes} Array of matching node objects.
     */
    search(query) {
        let { matcher, matchProcessor } = this.config.search;

        // Don't search if query empty
        if (!query || (_.isString(query) && _.isEmpty(query))) {
            return Promise.resolve(this.clearSearch());
        }

        this.batch();

        // Reset states
        this.recurseDown((node) => {
            node.state('hidden', true);
            node.state('matched', false);
        });

        this.end();

        // Query nodes for any matching the query
        matcher = _.isFunction(matcher) ? matcher : (query, resolve) => {
            let matches = new TreeNodes(this);

            // Convery the query into a usable predicate
            if (_.isString(query)) {
                query = new RegExp(query, 'i');
            }

            let predicate;
            if (_.isRegExp(query)) {
                predicate = (node) => {
                    return query.test(node.text);
                };
            }
            else {
                predicate = query;
            }

            // Recurse down and find all matches
            this.model.recurseDown((node) => {
                if (!node.removed()) {
                    if (predicate(node)) {
                        // Return as a match
                        matches.push(node);
                    }
                }
            });

            resolve(matches);
        };

        // Process all matching nodes.
        matchProcessor = _.isFunction(matchProcessor) ? matchProcessor : (matches) => {
            matches.each((node) => {
                node.show().state('matched', true);

                node.expandParents().collapse();

                if (node.hasChildren()) {
                    node.children.showDeep();
                }
            });
        };

        // Wrap the search matcher with a promise since it could require async requests
        return new Promise((resolve, reject) => {
            // Execute the matcher and pipe results to the processor
            matcher(query, (matches) => {
                // Convert to a TreeNodes array if we're receiving external nodes
                if (!InspireTree.isTreeNodes(matches)) {
                    matches = this.nodes(_.map(matches, 'id'));
                }

                this.batch();

                matchProcessor(matches);

                this.end();

                resolve(matches);
            }, reject);
        });
    }

    /**
     * Select nodes.
     *
     * @return {TreeNodes} Array of node objects.
     */
    select() {
        return map(this, 'select', arguments);
    }

    /**
     * Query for all selectable nodes.
     *
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
     * @param {TreeNode} startNode Starting node
     * @param {TreeNode} endNode Ending node
     * @return {Tree} Tree instance.
     */
    selectBetween(startNode, endNode) {
        this.batch();

        let node = startNode.nextVisibleNode();
        while (node.id !== endNode.id) {
            node.select();

            node = node.nextVisibleNode();
        }

        this.end();

        return this;
    };

    /**
     * Select (deeply) all nodes.
     *
     * @return {TreeNodes} Array of node objects.
     */
    selectDeep() {
        return map(this, 'selectDeep', arguments);
    }

    /**
     * Query for all selected nodes.
     *
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    selected() {
        return map(this, 'selected', arguments);
    }

    /**
     * Select the first available node.
     *
     * @return {TreeNode} Selected node object.
     */
    selectFirstAvailableNode() {
        let node = this.model.filterBy('available').get(0);
        if (node) {
            node.select();
        }

        return node;
    };

    /**
     * Shift node in the first index position.
     *
     * @return {TreeNode} Node object.
     */
    shift() {
        return map(this, 'shift', arguments);
    }

    /**
     * Show nodes.
     *
     * @return {TreeNodes} Array of node objects.
     */
    show() {
        return map(this, 'show', arguments);
    }

    /**
     * Show (deeply) all nodes.
     *
     * @return {TreeNodes} Array of node objects.
     */
    showDeep() {
        return map(this, 'showDeep', arguments);
    }

    /**
     * Get a shallow copy of a portion of nodes.
     *
     * @param {int} begin Starting index.
     * @param {int} end End index.
     * @return {Array} Array of selected subset.
     */
    slice() {
        return map(this, 'slice', arguments);
    }

    /**
     * Soft-remove nodes.
     *
     * @return {TreeNodes} Array of node objects.
     */
    softRemove() {
        return map(this, 'softRemove', arguments);
    }

    /**
     * Check if at least one node passes the given test.
     *
     * @param {function} tester Test each node in this collection,
     * @return {boolean} True if at least one node passes the test.
     */
    some() {
        return map(this, 'some', arguments);
    }

    /**
     * Sort nodes using a function.
     *
     * @param {function} compareFn Comparison function.
     * @return {TreeNodes} Root array of node objects.
     */
    sort() {
        return map(this, 'sort', arguments);
    }

    /**
     * Sort nodes using a function or key name.
     *
     * If no custom sorter given, the configured "sort" value will be used.
     *
     * @param {string|function} sorter Sort function or property name.
     * @return {TreeNodes} Array of node obejcts.
     */
    sortBy() {
        return map(this, 'sortBy', arguments);
    }

    /**
     * Remove and/or add new TreeNodes into the root collection.
     *
     * @param {int} start Starting index.
     * @param {int} deleteCount Count of nodes to delete.
     * @param {TreeNode} node Node(s) to insert.
     * @return {Array} Array of selected subset.
     */
    splice() {
        return map(this, 'slice', arguments);
    }

    /**
     * Set nodes' state values.
     *
     * @param {string} name Property name.
     * @param {boolean} newVal New value, if setting.
     * @return {TreeNodes} Array of node objects.
     */
    state() {
        return map(this, 'state', arguments);
    }

    /**
     * Set (deeply) nodes' state values.
     *
     * @param {string} name Property name.
     * @param {boolean} newVal New value, if setting.
     * @return {TreeNodes} Array of node objects.
     */
    stateDeep() {
        return map(this, 'stateDeep', arguments);
    }

    /**
     * Swap two node positions.
     *
     * @param {TreeNode} node1 Node 1.
     * @param {TreeNode} node2 Node 2.
     * @return {TreeNodes} Array of node objects.
     */
    swap() {
        return map(this, 'swap', arguments);
    }

    /**
     * Get a native node Array.
     *
     * @return {array} Array of node objects.
     */
    toArray() {
        return map(this, 'toArray', arguments);
    }

    /**
     * Get a string representation of node objects.
     *
     * @return {string} Strings from root node objects.
     */
    toString() {
        return map(this, 'toString', arguments);
    }

    /**
     * Resume events.
     *
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
     * Add a TreeNode in the first index position.
     *
     * @return {number} The new length
     */
    unshift() {
        return map(this, 'unshift', arguments);
    }

    /**
     * Query for all visible nodes.
     *
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    visible() {
        return map(this, 'visible', arguments);
    }
}

export default InspireTree;
