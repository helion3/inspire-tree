// Libs
import * as _ from 'lodash';
import { objectToNode } from './lib/object-to-node';
import { Promise } from 'es6-promise';
import { recurseDown } from './lib/recurse-down';
import { TreeNode } from './treenode';

/**
 * Base function to filter nodes by state value.
 *
 * @private
 * @param {string} state State property
 * @param {boolean} full Return a non-flat hierarchy
 * @return {TreeNodes} Array of matching nodes.
 */
function baseStatePredicate(state, full) {
    if (full) {
        return this.extract(state);
    }

    // Cache a state predicate function
    let fn = getPredicateFunction(state);

    return this.flatten((node) => {
        // Never include removed nodes unless specifically requested
        if (state !== 'removed' && node.removed()) {
            return false;
        }

        return fn(node);
    });
};

/**
 * Base function to invoke given method(s) on tree nodes.
 *
 * @private
 * @param {TreeNode} nodes Array of node objects.
 * @param {string|array} methods Method names.
 * @param {array|Arguments} args Array of arguments to proxy.
 * @param {boolean} deep Invoke deeply.
 * @return {TreeNodes} Array of node objects.
 */
function baseInvoke(nodes, methods, args, deep) {
    methods = _.castArray(methods);

    nodes._tree.batch();

    nodes[deep ? 'recurseDown' : 'each']((node) => {
        _.each(methods, (method) => {
            if (_.isFunction(node[method])) {
                node[method].apply(node, args);
            }
        });
    });

    nodes._tree.end();

    return nodes;
}

/**
 * Creates a predicate function.
 *
 * @private
 * @param {string|function} predicate Property name or custom function.
 * @return {function} Predicate function.
 */
function getPredicateFunction(predicate) {
    let fn = predicate;
    if (_.isString(predicate)) {
        fn = (node) => {
            return _.isFunction(node[predicate]) ? node[predicate]() : node[predicate];
        };
    }

    return fn;
}

/**
 * An Array-like collection of TreeNodes.
 *
 * Note: Due to issue in many javascript environments,
 * native objects are problematic to extend correctly
 * so we mimic it, not actually extend it.
 *
 * @category TreeNodes
 * @param {array} array Array of TreeNode objects.
 * @return {TreeNodes} Collection of TreeNode
 */
export class TreeNodes extends Array {
    constructor(tree, array) {
        super();

        if (_.isFunction(_.get(tree, 'isTree')) && !tree.isTree(tree)) {
            throw new TypeError('Invalid tree instance.');
        }

        this._tree = tree;
        this.length = 0;

        // Init pagination
        this._pagination = {
            limit: tree.config.pagination.limit,
            total: 0
        };

        if (_.isArray(array) || array instanceof TreeNodes) {
            _.each(array, (node) => {
                if (node instanceof TreeNode) {
                    this.push(node.clone());
                }
                else {
                    this.addNode(node);
                }
            });
        }
    }

    /**
     * Adds a new node. If a sort method is configured,
     * the node will be added in the appropriate order.
     *
     * @category TreeNodes
     * @param {object} object Node
     * @return {TreeNode} Node object.
     */
    addNode(object) {
        // Base insertion index
        let index = this.length;

        // If tree is sorted, insert in correct position
        if (this._tree.config.sort) {
            index = _.sortedIndexBy(this, object, this._tree.config.sort);
        }

        return this.insertAt(index, object);
    }

    /**
     * Query for all available nodes.
     *
     * @category TreeNodes
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    available(full) {
        return baseStatePredicate.call(this, 'available', full);
    }

    /**
     * Blur nodes.
     *
     * @category TreeNodes
     * @return {TreeNodes} Array of node objects.
     */
    blur() {
        return this.invoke('blur');
    }

    /**
     * Blur (deeply) all nodes.
     *
     * @category TreeNodes
     * @return {TreeNodes} Array of node objects.
     */
    blurDeep() {
        return this.invokeDeep('blur');
    }

    /**
     * Query for all checked nodes.
     *
     * @category TreeNodes
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    checked(full) {
        return baseStatePredicate.call(this, 'checked', full);
    }

    /**
     * Clean nodes.
     *
     * @category TreeNodes
     * @return {TreeNodes} Array of node objects.
     */
    clean() {
        return this.invoke('clean');
    }

    /**
     * Clones (deeply) the array of nodes.
     *
     * Note: Cloning will *not* clone the context pointer.
     *
     * @category TreeNodes
     * @return {TreeNodes} Array of cloned nodes.
     */
    clone() {
        return new TreeNodes(this._tree, this);
    }

    /**
     * Collapse nodes.
     *
     * @category TreeNodes
     * @return {TreeNodes} Array of node objects.
     */
    collapse() {
        return this.invoke('collapse');
    }

    /**
     * Query for all collapsed nodes.
     *
     * @category TreeNodes
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    collapsed(full) {
        return baseStatePredicate.call(this, 'collapsed', full);
    }

    /**
     * Collapse (deeply) all children.
     *
     * @category TreeNodes
     * @return {TreeNodes} Array of node objects.
     */
    collapseDeep() {
        return this.invokeDeep('collapse');
    }

    /**
     * Concat multiple TreeNodes arrays.
     *
     * @category TreeNodes
     * @param {TreeNodes} nodes Array of nodes.
     * @return {TreeNodes} Resulting node array.
     */
    concat(nodes) {
        let newNodes = new TreeNodes(this._tree);
        newNodes._context = this._context;

        let pusher = (node) => {
            if (node instanceof TreeNode) {
                newNodes.push(node);
            }
        };

        _.each(this, pusher);
        _.each(nodes, pusher);

        // Copy pagination limit
        newNodes._pagination.limit = this._pagination.limit;

        return newNodes;
    }

    /**
     * Get the context of this collection. If a collection
     * of children, context is the parent node. Otherwise
     * the context is the tree itself.
     *
     * @category TreeNodes
     * @return {TreeNode|object} Node object or tree instance.
     */
    context() {
        return this._context || this._tree;
    }

    /**
     * Copy nodes to another tree instance.
     *
     * @category TreeNodes
     * @param {boolean} hierarchy Include necessary ancestors to match hierarchy.
     * @return {object} Methods to perform action on copied nodes.
     */
    copy(hierarchy) {
        return {

            /**
             * Sets a destination.
             *
             * @category CopyNode
             * @param {object} dest Destination Inspire Tree.
             * @return {array} Array of new nodes.
             */
            to: (dest) => {
                if (!_.isFunction(dest.addNodes)) {
                    throw new Error('Destination must be an Inspire Tree instance.');
                }

                let newNodes = new TreeNodes(this._tree);

                _.each(this, (node) => {
                    newNodes.push(node.copy(hierarchy).to(dest));
                });

                return newNodes;
            }
        };
    }

    /**
     * Return deepest nodes.
     *
     * @category TreeNodes
     * @return {TreeNodes} Array of node objects.
     */
    deepest() {
        let matches = new TreeNodes(this._tree);

        this.recurseDown((node) => {
            if (!node.children) {
                matches.push(node);
            }
        });

        return matches;
    }

    /**
     * Deselect nodes.
     *
     * @category TreeNodes
     * @return {TreeNodes} Array of node objects.
     */
    deselect() {
        return this.invoke('deselect');
    }

    /**
     * Deselect (deeply) all nodes.
     *
     * @category TreeNodes
     * @return {TreeNodes} Array of node objects.
     */
    deselectDeep() {
        return this.invokeDeep('deselect');
    }

    /**
     * Iterate each TreeNode.
     *
     * @category TreeNodes
     * @param {function} iteratee Iteratee invoke for each node.
     * @return {TreeNodes} Array of node objects.
     */
    each(iteratee) {
        _.each(this, iteratee);

        return this;
    }

    /**
     * Query for all editable nodes.
     *
     * @category TreeNodes
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    editable(full) {
        return baseStatePredicate.call(this, 'editable', full);
    }

    /**
     * Query for all nodes in editing mode.
     *
     * @category TreeNodes
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    editing(full) {
        return baseStatePredicate.call(this, 'editing', full);
    }

    /**
     * Expand nodes.
     *
     * @category TreeNodes
     * @return {TreeNodes} Array of node objects.
     */
    expand() {
        return this.invoke('expand');
    }

    /**
     * Query for all expanded nodes.
     *
     * @category TreeNodes
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    expanded(full) {
        return baseStatePredicate.call(this, 'expanded', full);
    }

    /**
     * Expand (deeply) all nodes.
     *
     * @category TreeNodes
     * @return {Promise} Promise resolved when all children have loaded and expanded.
     */
    expandDeep() {
        return new Promise((resolve) => {
            let waitCount = 0;

            let done = () => {
                if (--waitCount === 0) {
                    resolve(this);
                }
            };

            this.recurseDown((node) => {
                waitCount++;

                // Ignore nodes without children
                if (node.children) {
                    node.expand().catch(done).then(() => {
                        // Manually trigger expansion on newly loaded children
                        node.children.expandDeep().catch(done).then(done);
                    });
                }
                else {
                    done();
                }
            });
        });
    }

    /**
     * Expand parents.
     *
     * @category TreeNodes
     * @return {TreeNodes} Array of node objects.
     */
    expandParents() {
        return this.invoke('expandParents');
    }

    /**
     * Clone a hierarchy of all nodes matching a predicate.
     *
     * Because it filters deeply, we must clone all nodes so that we
     * don't affect the actual node array.
     *
     * @category TreeNodes
     * @param {string|function} predicate State flag or custom function.
     * @return {TreeNodes} Array of node objects.
     */
    extract(predicate) {
        let flat = this.flatten(predicate);
        let matches = new TreeNodes(this._tree);

        _.each(flat, (node) => matches.addNode(node.copyHierarchy()));

        return matches;
    }

    /**
     * Filter all nodes matching the given predicate.
     *
     * @category TreeNodes
     * @param {string|function} predicate State flag or custom function.
     * @return {TreeNodes} Array of node objects.
     */
    filterBy(predicate) {
        let fn = getPredicateFunction(predicate);
        let matches = new TreeNodes(this._tree);

        _.each(this, (node) => {
            if (fn(node)) {
                matches.push(node);
            }
        });

        return matches;
    }

    /**
     * Flatten and get only node(s) matching the expected state or predicate function.
     *
     * @category TreeNodes
     * @param {string|function} predicate State property or custom function.
     * @return {TreeNodes} Flat array of matching nodes.
     */
    flatten(predicate) {
        let flat = new TreeNodes(this._tree);

        let fn = getPredicateFunction(predicate);
        this.recurseDown((node) => {
            if (fn(node)) {
                flat.push(node);
            }
        });

        return flat;
    }

    /**
     * Query for all focused nodes.
     *
     * @category TreeNodes
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    focused(full) {
        return baseStatePredicate.call(this, 'focused', full);
    }

    /**
     * Iterate each TreeNode.
     *
     * @category TreeNodes
     * @param {function} iteratee Iteratee invoke for each node.
     * @return {TreeNodes} Array of node objects.
     */
    forEach(iteratee) {
        return this.each(iteratee);
    }

    /**
     * Get a specific node by its index, or undefined if it doesn't exist.
     *
     * @category TreeNodes
     * @param {int} index Numeric index of requested node.
     * @return {TreeNode} Node object. Undefined if invalid index.
     */
    get(index) {
        return this[index];
    }

    /**
     * Query for all hidden nodes.
     *
     * @category TreeNodes
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    hidden(full) {
        return baseStatePredicate.call(this, 'hidden', full);
    }

    /**
     * Hide nodes.
     *
     * @category TreeNodes
     * @return {TreeNodes} Array of node objects.
     */
    hide() {
        return this.invoke('hide');
    }

    /**
     * Hide (deeply) all nodes.
     *
     * @category TreeNodes
     * @return {TreeNodes} Array of node objects.
     */
    hideDeep() {
        return this.invokeDeep('hide');
    }

    /**
     * Query for all indeterminate nodes.
     *
     * @category TreeNodes
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    indeterminate(full) {
        return baseStatePredicate.call(this, 'indeterminate', full);
    }

    /**
     * Insert a new node at a given position.
     *
     * @category TreeNodes
     * @param {integer} index Index at which to insert the node.
     * @param {object} object Raw node object or TreeNode.
     * @return {TreeNode} Node object.
     */
    insertAt(index, object) {
        // If node has a pre-existing ID
        if (object.id) {
            // Is it already in the tree?
            let existingNode = this.node(object.id);
            if (existingNode) {
                existingNode.restore().show();

                // Merge children
                if (_.isArrayLike(object.children)) {
                    // Setup existing node's children property if needed
                    if (!_.isArrayLike(existingNode.children)) {
                        existingNode.children = new TreeNodes(this._tree);
                        existingNode.children._context = existingNode;
                    }

                    // Copy each child (using addNode, which uses insertAt)
                    _.each(object.children, (child) => {
                        existingNode.children.addNode(child);
                    });
                }

                // Merge truthy children
                else if (object.children && _.isBoolean(existingNode.children)) {
                    existingNode.children = object.children;
                }

                existingNode.markDirty();
                this._tree.applyChanges();

                // Node merged, return it.
                return existingNode;
            }
        }

        // Node is new, insert at given location.
        let node = this._tree.constructor.isTreeNode(object) ? object : objectToNode(this._tree, object);

        // Grab remaining nodes
        this.splice(index, 0, node);

        // Refresh parent state and mark dirty
        if (this._context) {
            node.itree.parent = this._context;
            this._context.refreshIndeterminateState().markDirty();
        }

        // Event
        this._tree.emit('node.added', node);

        // Always mark this node as dirty
        node.markDirty();

        // If pushing this node anywhere but the end, other nodes may change.
        if (this.length - 1 !== index) {
            this.invoke('markDirty');
        }

        this._tree.applyChanges();

        return node;
    }

    /**
     * Invoke method(s) on each node.
     *
     * @category TreeNodes
     * @param {string|array} methods Method name(s).
     * @param {array|Arguments} args Array of arguments to proxy.
     * @return {TreeNodes} Array of node objects.
     */
    invoke(methods, args) {
        return baseInvoke(this, methods, args);
    }

    /**
     * Invoke method(s) deeply.
     *
     * @category TreeNodes
     * @param {string|array} methods Method name(s).
     *  @param {array|Arguments} args Array of arguments to proxy.
     * @return {TreeNodes} Array of node objects.
     */
    invokeDeep(methods, args) {
        return baseInvoke(this, methods, args, true);
    }

    /**
     * Query for all nodes currently loading children.
     *
     * @category TreeNodes
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    loading(full) {
        return baseStatePredicate.call(this, 'loading', full);
    }

    /**
     * Loads additional nodes for this context.
     *
     * @category TreeNodes
     * @param {Event} event Click or scroll event if DOM interaction triggered this call.
     * @return {Promise} Resolves with request results.
     */
    loadMore(event) {
        // Never refire if node is loading
        if (this._loading) {
            return Promise.reject(new Error('Pending loadMore call must complete before being invoked again.'));
        }

        let promise;

        // If no records remain, immediately resolve
        if (this._pagination.limit === this._pagination.total) {
            return Promise.resolve();
        }

        // Set loading flag, prevents repeat requests
        this._loading = true;
        this._tree.batch();

        // Mark this context as dirty since we'll update text/tree nodes
        _.invoke(this._context, 'markDirty');

        // Increment the pagination
        this._pagination.limit += this._tree.config.pagination.limit;

        // Emit an event
        this._tree.emit('node.paginated', this._context || this._tree, this.pagination, event);

        if (this._tree.config.deferredLoading) {
            if (this._context) {
                promise = this._context.loadChildren();
            }
            else {
                promise = this._tree.load(this._tree.config.data);
            }
        }
        else {
            this._loading = false;

            promise = Promise.resolve();
        }

        this._tree.end();

        // Clear the loading flag
        if (this._tree.config.deferredLoading) {
            promise.then(() => {
                this._loading = false;
                this._tree.applyChanges();
            }).catch(() => {
                this._loading = false;
                this._tree.applyChanges();
            });
        }

        return promise;
    }

    /**
     * Query for all nodes matched in the last search.
     *
     * @category TreeNodes
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    matched(full) {
        return baseStatePredicate.call(this, 'matched', full);
    }

    /**
     * Move node at a given index to a new index.
     *
     * @category TreeNodes
     * @param {int} index Current index.
     * @param {int} newIndex New index.
     * @param {TreeNodes} target Target TreeNodes array. Defaults to this.
     * @return {TreeNode} Node object.
     */
    move(index, newIndex, target = this) {
        this._tree.batch();

        const oldNode = this[index].remove();
        const node = target.insertAt(newIndex, oldNode);

        this._tree.emit('node.moved', node, this, index, target, newIndex);

        this._tree.end();

        return node;
    }

    /**
     * Get a node.
     *
     * @category TreeNodes
     * @param {string|number} id ID of node.
     * @return {TreeNode} Node object.
     */
    node(id) {
        let match;

        this.recurseDown((node) => {
            if (node.id === id) {
                match = node;

                return false;
            }
        });

        return match;
    }

    /**
     * Get all nodes in a tree, or nodes for an array of IDs.
     *
     * @category TreeNodes
     * @param {array} refs Array of ID references.
     * @return {TreeNodes} Array of node objects.
     * @example
     *
     * let all = tree.nodes()
     * let some = tree.nodes([1, 2, 3])
     */
    nodes(refs) {
        let results;

        if (_.isArray(refs)) {
            results = new TreeNodes(this._tree);

            this.recurseDown((node) => {
                if (refs.indexOf(node.id) > -1) {
                    results.push(node);
                }
            });
        }

        return _.isArray(refs) ? results : this;
    }

    /**
     * Get the pagination.
     *
     * @category TreeNodes
     * @return {object} Pagination configuration object.
     */
    pagination() {
        return this._pagination;
    }

    /**
     * Iterate down all nodes and any children.
     *
     * Return false to stop execution.
     *
     * @category TreeNodes
     * @param {function} iteratee Iteratee function.
     * @return {TreeNodes} Resulting nodes.
     */
    recurseDown(iteratee) {
        recurseDown(this, iteratee);

        return this;
    }

    /**
     * Remove a node.
     *
     * @category TreeNodes
     * @param {TreeNode} node Node object.
     * @return {TreeNodes} Resulting nodes.
     */
    remove(node) {
        _.remove(this, { id: node.id });

        _.invoke(this._context, 'markDirty');

        this._tree.applyChanges();

        return this;
    }

    /**
     * Query for all soft-removed nodes.
     *
     * @category TreeNodes
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    removed(full) {
        return baseStatePredicate.call(this, 'removed', full);
    }

    /**
     * Restore nodes.
     *
     * @category TreeNodes
     * @return {TreeNodes} Array of node objects.
     */
    restore() {
        return this.invoke('restore');
    }

    /**
     * Restore (deeply) all nodes.
     *
     * @category TreeNodes
     * @return {TreeNodes} Array of node objects.
     */
    restoreDeep() {
        return this.invokeDeep('restore');
    }

    /**
     * Select nodes.
     *
     * @category TreeNodes
     * @return {TreeNodes} Array of node objects.
     */
    select() {
        return this.invoke('select');
    }

    /**
     * Query for all selectable nodes.
     *
     * @category TreeNodes
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    selectable(full) {
        return baseStatePredicate.call(this, 'selectable', full);
    }

    /**
     * Select (deeply) all nodes.
     *
     * @category TreeNodes
     * @return {TreeNodes} Array of node objects.
     */
    selectDeep() {
        return this.invokeDeep('select');
    }

    /**
     * Query for all selected nodes.
     *
     * @category TreeNodes
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    selected(full) {
        return baseStatePredicate.call(this, 'selected', full);
    }

    /**
     * Show nodes.
     *
     * @category TreeNodes
     * @return {TreeNodes} Array of node objects.
     */
    show() {
        return this.invoke('show');
    }

    /**
     * Show (deeply) all nodes.
     *
     * @category TreeNodes
     * @return {TreeNodes} Array of node objects.
     */
    showDeep() {
        return this.invokeDeep('show');
    }

    /**
     * Soft-remove nodes.
     *
     * @category TreeNodes
     * @return {TreeNodes} Array of node objects.
     */
    softRemove() {
        return this.invoke('softRemove');
    }

    /**
     * Sorts all TreeNode objects in this collection.
     *
     * If no custom sorter given, the configured "sort" value will be used.
     *
     * @category TreeNodes
     * @param {string|function} sorter Sort function or property name.
     * @return {TreeNodes} Array of node obejcts.
     */
    sortBy(sorter) {
        sorter = sorter || this._tree.config.sort;

        // Only apply sort if one provided
        if (sorter) {
            let sorted = _.sortBy(this, sorter);

            this.length = 0;
            _.each(sorted, (node) => {
                this.push(node);
            });
        }

        return this;
    }

    /**
     * Set nodes' state values.
     *
     * @category TreeNodes
     * @param {string} name Property name.
     * @param {boolean} newVal New value, if setting.
     * @return {TreeNodes} Array of node objects.
     */
    state() {
        return this.invoke('state', arguments);
    }

    /**
     * Set (deeply) nodes' state values.
     *
     * @category TreeNodes
     * @param {string} name Property name.
     * @param {boolean} newVal New value, if setting.
     * @return {TreeNodes} Array of node objects.
     */
    stateDeep() {
        return this.invokeDeep('state', arguments);
    }

    /**
     * Swaps two node positions.
     *
     * @category TreeNodes
     * @param {TreeNode} node1 Node 1.
     * @param {TreeNode} node2 Node 2.
     * @return {TreeNodes} Array of node objects.
     */
    swap(node1, node2) {
        this._tree.batch();

        const n1Context = node1.context();
        const n2Context = node2.context();

        // Cache. Note: n2Index is only usable once
        const n1Index = n1Context.indexOf(node1);
        const n2Index = n2Context.indexOf(node2);

        // If contexts match, we can simply re-assign them
        if (n1Context === n2Context) {
            this[n1Index] = node2;
            this[n2Index] = node1;

            // Emit move events for each node
            this._tree.emit('node.moved', node1, n1Context, n1Index, n2Context, n2Index);
            this._tree.emit('node.moved', node2, n2Context, n2Index, n1Context, n1Index);
        }
        else {
            // Otherwise, we have to move between contexts
            // Move node 1 to node 2's index
            n1Context.move(n1Index, n2Context.indexOf(node2), n2Context);

            // Move node 2 to node 1s original index
            n2Context.move(n2Context.indexOf(node2), n1Index, n1Context);
        }

        this._tree.end();

        this._tree.emit('node.swapped', node1, n1Context, n1Index, node2, n2Context, n2Index);

        return this;
    }

    /**
     * Get the tree instance.
     *
     * @category TreeNodes
     * @return {[type]} [description]
     */
    tree() {
        return this._tree;
    }

    /**
     * Get a native node Array.
     *
     * @category TreeNodes
     * @return {array} Array of node objects.
     */
    toArray() {
        let array = [];

        _.each(this, (node) => {
            array.push(node.toObject());
        });

        return array;
    }

    /**
     * Query for all visible nodes.
     *
     * @category TreeNodes
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    visible(full) {
        return baseStatePredicate.call(this, 'visible', full);
    }
};
