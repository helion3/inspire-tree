import {
    castArray,
    defaultsDeep,
    each,
    get,
    invoke,
    isArray,
    isArrayLike,
    isArrayLikeObject,
    isBoolean,
    isFunction,
    isString,
    remove,
    sortBy,
    sortedIndexBy,
    tail
} from 'lodash';
import { objectToNode } from './lib/object-to-node';
import { recurseDown } from './lib/recurse-down';
import TreeNode from './treenode';

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
    methods = castArray(methods);

    nodes._tree.batch();

    nodes[deep ? 'recurseDown' : 'each'](node => {
        each(methods, method => {
            if (isFunction(node[method])) {
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
    if (isString(predicate)) {
        fn = node => (isFunction(node[predicate]) ? node[predicate]() : node[predicate]);
    }

    return fn;
}

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
    const fn = getPredicateFunction(state);

    return this.flatten(node => {
        // Never include removed nodes unless specifically requested
        if (state !== 'removed' && node.removed()) {
            return false;
        }

        return fn(node);
    });
}

/**
 * An Array-like collection of TreeNodes.
 *
 * Note: Due to issue in many javascript environments,
 * native objects are problematic to extend correctly
 * so we mimic it, not actually extend it.
 *
 * @param {InspireTree} tree Context tree.
 * @param {array} array Array of TreeNode objects.
 * @param {object} opts Configuration object.
 * @return {TreeNodes} Collection of TreeNode
 */
class TreeNodes extends Array {
    constructor(tree, array, opts) {
        super();

        if (isFunction(get(tree, 'isTree')) && !tree.isTree(tree)) {
            throw new TypeError('Invalid tree instance.');
        }

        this._tree = tree;
        this.length = 0;
        this.batching = 0;

        // A custom dirty flag to indicate when an index-altering
        // change has occured. Avoids re-caching when unnecessary.
        this.indicesDirty = false;

        this.config = defaultsDeep({}, opts, {
            calculateRenderablePositions: false
        });

        // Init pagination
        this._pagination = {
            limit: tree.config.pagination.limit,
            total: 0
        };

        if (isArray(array) || array instanceof TreeNodes) {
            each(array, node => {
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
     * @param {object} object Node
     * @return {TreeNode} Node object.
     */
    addNode(object) {
        // Base insertion index
        let index = this.length;

        // If tree is sorted, insert in correct position
        if (this._tree.config.sort) {
            index = sortedIndexBy(this, object, this._tree.config.sort);
        }

        return this.insertAt(index, object);
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
            this.calculateRenderablePositions();

            this._tree.emit('changes.applied', this.context());
        }
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
     * Query for all available nodes.
     *
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    available(full) {
        return baseStatePredicate.call(this, 'available', full);
    }

    /**
     * Blur nodes.
     *
     * @return {TreeNodes} Array of node objects.
     */
    blur() {
        return this.invoke('blur');
    }

    /**
     * Blur (deeply) all nodes.
     *
     * @return {TreeNodes} Array of node objects.
     */
    blurDeep() {
        return this.invokeDeep('blur');
    }

    /**
     * Calculate and cache the first/last renderable nodes.
     *
     * Primarily useful for rendering engines, since hidden DOM
     * nodes may still be present and CSS :first/:last selectors
     * would fail.
     *
     * @private
     * @return {void}
     */
    calculateRenderablePositions() {
        if (!this.indicesDirty || this.batching > 0 || !this.config.calculateRenderablePositions) {
            return;
        }

        let first;
        let last;

        this.each(node => {
            if (node.renderable()) {
                // Cache first node if none yet
                first = first || node;

                // Always update last node on match
                last = node;
            }
        });

        if (this.firstRenderableNode && this.firstRenderableNode !== first) {
            this.firstRenderableNode.markDirty();
        }

        if (first && first !== this.firstRenderableNode) {
            first.markDirty();
        }

        if (this.lastRenderableNode && this.lastRenderableNode !== last) {
            this.lastRenderableNode.markDirty();
        }

        if (last && last !== this.lastRenderableNode) {
            last.markDirty();
        }

        this.firstRenderableNode = first;
        this.lastRenderableNode = last;
        this.indicesDirty = false;
    }

    /**
     * Query for all checked nodes.
     *
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    checked(full) {
        return baseStatePredicate.call(this, 'checked', full);
    }

    /**
     * Clean nodes.
     *
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
     * @return {TreeNodes} Array of cloned nodes.
     */
    clone() {
        return new TreeNodes(this._tree, this);
    }

    /**
     * Collapse nodes.
     *
     * @return {TreeNodes} Array of node objects.
     */
    collapse() {
        return this.invoke('collapse');
    }

    /**
     * Query for all collapsed nodes.
     *
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    collapsed(full) {
        return baseStatePredicate.call(this, 'collapsed', full);
    }

    /**
     * Collapse (deeply) all children.
     *
     * @return {TreeNodes} Array of node objects.
     */
    collapseDeep() {
        return this.invokeDeep('collapse');
    }

    /**
     * Concat multiple TreeNodes arrays.
     *
     * @param {TreeNodes} nodes Array of nodes.
     * @return {TreeNodes} Resulting node array.
     */
    concat(nodes) {
        const newNodes = new TreeNodes(this._tree);
        newNodes._context = this._context;

        const pusher = node => {
            if (node instanceof TreeNode) {
                newNodes.push(node);
            }
        };

        each(this, pusher);
        each(nodes, pusher);

        // Copy pagination limit
        newNodes._pagination.limit = this._pagination.limit;

        return newNodes;
    }

    /**
     * Get the context of this collection. If a collection
     * of children, context is the parent node. Otherwise
     * the context is the tree itself.
     *
     * @return {TreeNode|object} Node object or tree instance.
     */
    context() {
        return this._context || this._tree;
    }

    /**
     * Copy nodes to another tree instance.
     *
     * @param {object} dest Destination Inspire Tree.
     * @param {boolean} hierarchy Include necessary ancestors to match hierarchy.
     * @param {boolean} includeState Include itree.state object.
     * @return {object} Methods to perform action on copied nodes.
     */
    copy(dest, hierarchy, includeState) {
        const newNodes = new TreeNodes(this._tree);

        each(this, node => {
            newNodes.push(node.copy(dest, hierarchy, includeState));
        });

        return newNodes;
    }

    /**
     * Return deepest nodes.
     *
     * @return {TreeNodes} Array of node objects.
     */
    deepest() {
        const matches = new TreeNodes(this._tree);

        this.recurseDown(node => {
            if (!node.children) {
                matches.push(node);
            }
        });

        return matches;
    }

    /**
     * Deselect nodes.
     *
     * @return {TreeNodes} Array of node objects.
     */
    deselect() {
        return this.invoke('deselect');
    }

    /**
     * Deselect (deeply) all nodes.
     *
     * @return {TreeNodes} Array of node objects.
     */
    deselectDeep() {
        return this.invokeDeep('deselect');
    }

    /**
     * Iterate each TreeNode.
     *
     * @param {function} iteratee Iteratee invoke for each node.
     * @return {TreeNodes} Array of node objects.
     */
    each(iteratee) {
        each(this, iteratee);

        return this;
    }

    /**
     * Query for all editable nodes.
     *
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    editable(full) {
        return baseStatePredicate.call(this, 'editable', full);
    }

    /**
     * Query for all nodes in editing mode.
     *
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    editing(full) {
        return baseStatePredicate.call(this, 'editing', full);
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
     * Expand nodes.
     *
     * @return {TreeNodes} Array of node objects.
     */
    expand() {
        return this.invoke('expand');
    }

    /**
     * Query for all expanded nodes.
     *
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    expanded(full) {
        return baseStatePredicate.call(this, 'expanded', full);
    }

    /**
     * Expand (deeply) all nodes.
     *
     * @return {Promise<TreeNodes>} Promise resolved when all children have loaded and expanded.
     */
    expandDeep() {
        return new Promise(resolve => {
            let waitCount = 0;

            const done = () => {
                if (--waitCount === 0) {
                    resolve(this);
                }
            };

            this.recurseDown(node => {
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
     * @param {string|function} predicate State flag or custom function.
     * @return {TreeNodes} Array of node objects.
     */
    extract(predicate) {
        const flat = this.flatten(predicate);
        const matches = new TreeNodes(this._tree);

        each(flat, node => matches.addNode(node.copyHierarchy()));

        return matches;
    }

    /**
     * Filter all nodes matching the given predicate.
     *
     * @param {string|function} predicate State flag or custom function.
     * @return {TreeNodes} Array of node objects.
     */
    filterBy(predicate) {
        const fn = getPredicateFunction(predicate);
        const matches = new TreeNodes(this._tree);

        each(this, node => {
            if (fn(node)) {
                matches.push(node);
            }
        });

        return matches;
    }

    /**
     * Returns the first node matching predicate.
     *
     * @param {function} predicate Predicate function, accepts a single node and returns a boolean.
     * @return {TreeNode} First matching TreeNode, or undefined.
     */
    find(predicate) {
        let match;

        this.recurseDown(node => {
            if (predicate(node)) {
                match = node;

                return false;
            }
        });

        return match;
    }

    /**
     * Returns the first shallow node matching predicate.
     *
     * @param {function} predicate Predicate function, accepts a single node and returns a boolean.
     * @return {TreeNode} First matching TreeNode, or undefined.
     */
    first(predicate) {
        for (let i = 0, l = this.length; i < l; i++) {
            if (predicate(this[i])) {
                return this[i];
            }
        }
    }

    /**
     * Flatten and get only node(s) matching the expected state or predicate function.
     *
     * @param {string|function} predicate State property or custom function.
     * @return {TreeNodes} Flat array of matching nodes.
     */
    flatten(predicate) {
        const flat = new TreeNodes(this._tree);

        const fn = getPredicateFunction(predicate);
        this.recurseDown(node => {
            if (fn(node)) {
                flat.push(node);
            }
        });

        return flat;
    }

    /**
     * Query for all focused nodes.
     *
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    focused(full) {
        return baseStatePredicate.call(this, 'focused', full);
    }

    /**
     * Iterate each TreeNode.
     *
     * @param {function} iteratee Iteratee invoke for each node.
     * @return {TreeNodes} Array of node objects.
     */
    forEach(iteratee) {
        return this.each(iteratee);
    }

    /**
     * Get a specific node by its index, or undefined if it doesn't exist.
     *
     * @param {int} index Numeric index of requested node.
     * @return {TreeNode} Node object. Undefined if invalid index.
     */
    get(index) {
        return this[index];
    }

    /**
     * Query for all hidden nodes.
     *
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    hidden(full) {
        return baseStatePredicate.call(this, 'hidden', full);
    }

    /**
     * Hide nodes.
     *
     * @return {TreeNodes} Array of node objects.
     */
    hide() {
        return this.invoke('hide');
    }

    /**
     * Hide (deeply) all nodes.
     *
     * @return {TreeNodes} Array of node objects.
     */
    hideDeep() {
        return this.invokeDeep('hide');
    }

    /**
     * Query for all indeterminate nodes.
     *
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    indeterminate(full) {
        return baseStatePredicate.call(this, 'indeterminate', full);
    }

    /**
     * Insert a new node at a given position.
     *
     * @param {integer} index Index at which to insert the node.
     * @param {object} object Raw node object or TreeNode.
     * @return {TreeNode} Node object.
     */
    insertAt(index, object) {
        // If node has a pre-existing ID
        if (object.id) {
            // Is it already in the tree?
            const existingNode = this.node(object.id);
            if (existingNode) {
                existingNode.restore().show();

                // Merge children
                if (isArrayLike(object.children)) {
                    // Setup existing node's children property if needed
                    if (!isArrayLike(existingNode.children)) {
                        existingNode.children = new TreeNodes(this._tree);
                        existingNode.children._context = existingNode;
                    }

                    // Copy each child (using addNode, which uses insertAt)
                    each(object.children, child => {
                        existingNode.children.addNode(child);
                    });
                }

                // Merge truthy children
                else if (object.children && isBoolean(existingNode.children)) {
                    existingNode.children = object.children;
                }

                existingNode.markDirty();
                this.applyChanges();

                // Node merged, return it.
                return existingNode;
            }
        }

        // Node is new, insert at given location.
        const node = this._tree.constructor.isTreeNode(object) ? object : objectToNode(this._tree, object);

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

        this.applyChanges();

        return node;
    }

    /**
     * Invoke method(s) on each node.
     *
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
     * @param {string|array} methods Method name(s).
     * @param {array|Arguments} args Array of arguments to proxy.
     * @return {TreeNodes} Array of node objects.
     */
    invokeDeep(methods, args) {
        if (!isArrayLikeObject(args) || arguments.length > 2) {
            args = tail(arguments);
        }

        return baseInvoke(this, methods, args, true);
    }

    /**
     * Returns the last shallow node matching predicate.
     *
     * @param {function} predicate Predicate function, accepts a single node and returns a boolean.
     * @return {TreeNode} Last matching shallow TreeNode, or undefined.
     */
    last(predicate) {
        for (let i = this.length - 1; i >= 0; i--) {
            if (predicate(this[i])) {
                return this[i];
            }
        }
    }

    /**
     * Query for all nodes currently loading children.
     *
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    loading(full) {
        return baseStatePredicate.call(this, 'loading', full);
    }

    /**
     * Loads additional nodes for this context.
     *
     * @param {Event} event Click or scroll event if DOM interaction triggered this call.
     * @return {Promise<TreeNodes>} Resolves with request results.
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
        this.batch();

        // Mark this context as dirty since we'll update text/tree nodes
        invoke(this._context, 'markDirty');

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

        this.end();

        // Clear the loading flag
        if (this._tree.config.deferredLoading) {
            promise.then(() => {
                this._loading = false;
                this.applyChanges();
            }).catch(() => {
                this._loading = false;
                this.applyChanges();
            });
        }

        return promise;
    }

    /**
     * Query for all nodes matched in the last search.
     *
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    matched(full) {
        return baseStatePredicate.call(this, 'matched', full);
    }

    /**
     * Move node at a given index to a new index.
     *
     * @param {int} index Current index.
     * @param {int} newIndex New index.
     * @param {TreeNodes} target Target TreeNodes array. Defaults to this.
     * @return {TreeNode} Node object.
     */
    move(index, newIndex, target = this) {
        const oldNode = this[index].remove();
        const node = target.insertAt(newIndex, oldNode);

        this._tree.emit('node.moved', node, this, index, target, newIndex);

        return node;
    }

    /**
     * Get a node.
     *
     * @param {string|number} id ID of node.
     * @return {TreeNode} Node object.
     */
    node(id) {
        let match;

        this.recurseDown(node => {
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
     * @param {array} refs Array of ID references.
     * @return {TreeNodes} Array of node objects.
     * @example
     *
     * const all = tree.nodes()
     * const some = tree.nodes([1, 2, 3])
     */
    nodes(refs) {
        let results;

        if (isArray(refs)) {
            results = new TreeNodes(this._tree);

            this.recurseDown(node => {
                if (refs.indexOf(node.id) > -1) {
                    results.push(node);
                }
            });
        }

        return isArray(refs) ? results : this;
    }

    /**
     * Get the pagination.
     *
     * @return {object} Pagination configuration object.
     */
    pagination() {
        return this._pagination;
    }

    /**
     * Removes the last node.
     *
     * @return {TreeNode} Last tree node.
     */
    pop() {
        const result = super.pop();

        this.indicesDirty = true;
        this.calculateRenderablePositions();

        return result;
    }

    /**
     * Push a new TreeNode onto the collection.
     *
     * @param {TreeNode} node Node objext.
     * @returns {number} The new length.
     */
    push(node) {
        const result = super.push(node);

        this.indicesDirty = true;
        this.calculateRenderablePositions();

        return result;
    }

    /**
     * Iterate down all nodes and any children.
     *
     * Return false to stop execution.
     *
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
     * @param {TreeNode} node Node object.
     * @return {TreeNodes} Resulting nodes.
     */
    remove(node) {
        remove(this, { id: node.id });
        invoke(this._context, 'markDirty');

        this.indicesDirty = true;
        this.applyChanges();

        return this;
    }

    /**
     * Query for all soft-removed nodes.
     *
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    removed(full) {
        return baseStatePredicate.call(this, 'removed', full);
    }

    /**
     * Restore nodes.
     *
     * @return {TreeNodes} Array of node objects.
     */
    restore() {
        return this.invoke('restore');
    }

    /**
     * Restore (deeply) all nodes.
     *
     * @return {TreeNodes} Array of node objects.
     */
    restoreDeep() {
        return this.invokeDeep('restore');
    }

    /**
     * Select nodes.
     *
     * @return {TreeNodes} Array of node objects.
     */
    select() {
        return this.invoke('select');
    }

    /**
     * Query for all selectable nodes.
     *
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    selectable(full) {
        return baseStatePredicate.call(this, 'selectable', full);
    }

    /**
     * Select (deeply) all nodes.
     *
     * @return {TreeNodes} Array of node objects.
     */
    selectDeep() {
        return this.invokeDeep('select');
    }

    /**
     * Query for all selected nodes.
     *
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    selected(full) {
        return baseStatePredicate.call(this, 'selected', full);
    }

    /**
     * Removes the first node.
     *
     * @param {TreeNode} node Node object.
     * @return {TreeNode} Node object.
     */
    shift(node) {
        const result = super.shift(node);

        this.indicesDirty = true;
        this.calculateRenderablePositions();

        return result;
    }

    /**
     * Show nodes.
     *
     * @return {TreeNodes} Array of node objects.
     */
    show() {
        return this.invoke('show');
    }

    /**
     * Show (deeply) all nodes.
     *
     * @return {TreeNodes} Array of node objects.
     */
    showDeep() {
        return this.invokeDeep('show');
    }

    /**
     * Soft-remove nodes.
     *
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
     * @param {string|function} sorter Sort function or property name.
     * @return {TreeNodes} Array of node objects.
     */
    sortBy(sorter) {
        sorter = sorter || this._tree.config.sort;

        // Only apply sort if one provided
        if (sorter) {
            this.batch();

            const sorted = sortBy(this, sorter);

            this.length = 0;
            each(sorted, node => {
                this.push(node);
            });

            this.indicesDirty = true;

            this.end();
        }

        return this;
    }

    /**
     * Sorts (deeply) all nodes in this collection.
     *
     * @param {function} comparator [description]
     * @return {TreeNodes} Array of node objects.
     */
    sortDeep(comparator) {
        this.sort(comparator);

        this.each(node => {
            if (node.hasChildren()) {
                node.children.sortDeep(comparator);
            }
        });

        return this;
    }

    /**
     * Changes array contents by removing existing nodes and/or adding new nodes.
     *
     * @param {number} start Start index.
     * @param {number} deleteCount Number of nodes to delete.
     * @param {TreeNode} ...nodes One or more nodes.
     * @return {array} Array of deleted elements.
     */
    splice() {
        const result = super.splice.apply(this, arguments);

        this.indicesDirty = true;
        this.calculateRenderablePositions();

        return result;
    }

    /**
     * Set nodes' state values.
     *
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

        this.indicesDirty = true;

        this._tree.end();

        this._tree.emit('node.swapped', node1, n1Context, n1Index, node2, n2Context, n2Index);

        return this;
    }

    /**
     * Get the tree instance.
     *
     * @return {InspireTree} Tree instance.
     */
    tree() {
        return this._tree;
    }

    /**
     * Get a native node Array.
     *
     * @return {array} Array of node objects.
     */
    toArray() {
        const array = [];

        each(this, node => {
            array.push(node.toObject());
        });

        return array;
    }

    /**
     * Adds a node to beginning of the collection.
     *
     * @param {TreeNode} node Node object.
     * @return {number} New length of collection.
     */
    unshift(node) {
        const result = super.unshift(node);

        this.indicesDirty = true;
        this.calculateRenderablePositions();

        return result;
    }

    /**
     * Query for all visible nodes.
     *
     * @param {boolean} full Retain full hiearchy.
     * @return {TreeNodes} Array of node objects.
     */
    visible(full) {
        return baseStatePredicate.call(this, 'visible', full);
    }
}

export default TreeNodes;
