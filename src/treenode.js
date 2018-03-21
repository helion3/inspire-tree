// Libs
import * as _ from 'lodash';
import { baseStateChange } from './lib/base-state-change';
import { collectionToModel } from './lib/collection-to-model';
import { objectToNode } from './lib/object-to-node';
import { Promise } from 'es6-promise';
import { recurseDown } from './lib/recurse-down';
import { standardizePromise } from './lib/standardize-promise';
import TreeNodes from './treenodes';

/**
 * Helper method to clone an ITree config object.
 *
 * Rejects non-clonable properties like ref.
 *
 * @private
 * @param {object} itree ITree configuration object
 * @param {array} excludeKeys Keys to exclude, if any
 * @return {object} Cloned ITree.
 */
function cloneItree(itree, excludeKeys) {
    let clone = {};
    excludeKeys = _.castArray(excludeKeys);
    excludeKeys.push('ref');

    _.each(itree, (v, k) => {
        if (!_.includes(excludeKeys, k)) {
            clone[k] = _.cloneDeep(v);
        }
    });

    return clone;
}

/**
 * Represents a singe node object within the tree.
 *
 * @param {TreeNode} source TreeNode to copy.
 * @return {TreeNode} Tree node object.
 */
class TreeNode {
    constructor(tree, source, excludeKeys) {
        this._tree = tree;

        if (source instanceof TreeNode) {
            excludeKeys = _.castArray(excludeKeys);
            excludeKeys.push('_tree');

            // Iterate manually for better perf
            _.each(source, (value, key) => {
                // Skip properties
                if (!_.includes(excludeKeys, key)) {
                    if (_.isObject(value)) {
                        if (value instanceof TreeNodes) {
                            this[key] = value.clone();
                        }
                        else if (key === 'itree') {
                            this[key] = cloneItree(value);
                        }
                        else {
                            this[key] = _.cloneDeep(value);
                        }
                    }
                    else {
                        // Copy primitives
                        this[key] = value;
                    }
                }
            });
        }
    }

    /**
     * Add a child to this node.
     *
     * @param {object} child Node object.
     * @return {TreeNode} Node object.
     */
    addChild(child) {
        if (_.isArray(this.children) || !_.isArrayLike(this.children)) {
            this.children = new TreeNodes(this._tree);
            this.children._context = this;
        }

        return this.children.addNode(child);
    }

    /**
     * Add multiple children to this node.
     *
     * @param {object} children Array of nodes.
     * @return {TreeNodes} Array of node objects.
     */
    addChildren(children) {
        let nodes = new TreeNodes(this._tree);

        this._tree.batch();
        _.each(children, (child) => {
            nodes.push(this.addChild(child));
        });
        this._tree.end();

        return nodes;
    }

    /**
     * Ensure this node allows dynamic children.
     *
     * @private
     * @return {boolean} True if tree/node allows dynamic children.
     */
    allowDynamicLoad() {
        return this._tree.isDynamic && (_.isArrayLike(this.children) || this.children === true);
    }

    /**
     * Check if node available.
     *
     * @return {boolean} True if available.
     */
    available() {
        return (!this.hidden() && !this.removed());
    }

    /**
     * Blur focus from this node.
     *
     * @return {TreeNode} Node object.
     */
    blur() {
        this.state('editing', false);

        return baseStateChange('focused', false, 'blurred', this);
    };

    /**
     * Mark node as checked.
     *
     * @param {boolean} shallow Skip auto-checking children.
     * @return {TreeNode} Node object.
     */
    check(shallow) {
        this._tree.batch();

        // Will we automatically apply state changes to our children
        let deep = !shallow && this._tree.config.checkbox.autoCheckChildren;

        baseStateChange('checked', true, 'checked', this, deep);

        // Reset indeterminate state
        this.state('indeterminate', false);

        // Refresh parent
        if (this.hasParent()) {
            this.getParent().refreshIndeterminateState();
        }

        this._tree.end();

        return this;
    };

    /**
     * Get whether this node is checked.
     *
     * @return {boolean} True if node checked.
     */
    checked() {
        return this.state('checked');
    }

    /**
     * Hide parents without any visible children.
     *
     * @return {TreeNode} Node object.
     */
    clean() {
        this.recurseUp((node) => {
            if (node.hasParent()) {
                let parent = node.getParent();
                if (!parent.hasVisibleChildren()) {
                    parent.hide();
                }
            }
        });

        return this;
    }

    /**
     * Clone this node.
     *
     * @param {array} excludeKeys Keys to exclude from the clone.
     * @return {TreeNode} New node object.
     */
    clone(excludeKeys) {
        return new TreeNode(this._tree, this, excludeKeys);
    }

    /**
     * Collapse this node.
     *
     * @return {TreeNode} Node object.
     */
    collapse() {
        return baseStateChange('collapsed', true, 'collapsed', this);
    }

    /**
     * Get whether this node is collapsed.
     *
     * @return {boolean} True if node collapsed.
     */
    collapsed() {
        return this.state('collapsed');
    }

    /**
     * Get the containing context. If no parent present, the root context is returned.
     *
     * @return {TreeNodes} Node array object.
     */
    context() {
        return this.hasParent() ? this.getParent().children : this._tree.model;
    }

    /**
     * Copy node to another tree instance.
     *
     * @param {object} dest Destination Inspire Tree.
     * @param {boolean} hierarchy Include necessary ancestors to match hierarchy.
     * @return {object} Property "to" for defining destination.
     */
    copy(dest, hierarchy) {
        if (!dest || !_.isFunction(dest.addNode)) {
            throw new Error('Destination must be an Inspire Tree instance.');
        }

        let node = this;
        if (hierarchy) {
            node = node.copyHierarchy();
        }

        return dest.addNode(node.toObject());
    }

    /**
     * Copy all parents of a node.
     *
     * @param {boolean} excludeNode Exclude given node from hierarchy.
     * @return {TreeNode} Root node object with hierarchy.
     */
    copyHierarchy(excludeNode) {
        let nodes = [];
        let parents = this.getParents();

        // Remove old hierarchy data
        _.each(parents, (node) => {
            nodes.push(node.toObject(excludeNode));
        });

        parents = nodes.reverse();

        if (!excludeNode) {
            let clone = this.toObject(true);

            // Filter out hidden children
            if (this.hasChildren()) {
                clone.children = this.children.filterBy((n) => {
                    return !n.state('hidden');
                }).toArray();

                clone.children._context = clone;
            }

            nodes.push(clone);
        }

        let hierarchy = nodes[0];
        let pointer = hierarchy;
        let l = nodes.length;
        _.each(nodes, (parent, key) => {
            let children = [];

            if (key + 1 < l) {
                children.push(nodes[key + 1]);
                pointer.children = children;

                pointer = pointer.children[0];
            }
        });

        return objectToNode(this._tree, hierarchy);
    };

    /**
     * Deselect this node.
     *
     * If selection.require is true and this is the last selected
     * node, the node will remain in a selected state.
     *
     * @param {boolean} shallow Skip auto-deselecting children.
     * @return {TreeNode} Node object.
     */
    deselect(shallow) {
        if (this.selected() && (!this._tree.config.selection.require || this._tree.selected().length > 1)) {
            this._tree.batch();

            // Will we apply this state change to our children?
            let deep = !shallow && this._tree.config.selection.autoSelectChildren;

            baseStateChange('selected', false, 'deselected', this, deep);

            this._tree.end();
        }

        return this;
    }

    /**
     * Get weather node editable. Required editing.edit to be enable via config.
     *
     * @return {boolean} True if node editable.
     */
    editable() {
        return this._tree.config.editable && this._tree.config.editing.edit && this.state('editable');
    }

    /**
     * Get weather node is currently in edit mode.
     *
     * @return {boolean} True if node in edit mode.
     */
    editing() {
        return this.state('editing');
    }

    /**
     * Expand this node.
     *
     * @return {Promise} Promise resolved on successful load and expand of children.
     */
    expand() {
        let node = this;

        return new Promise((resolve, reject) => {
            let allow = (node.hasChildren() || (node._tree.isDynamic && node.children === true));

            if (allow && (node.collapsed() || node.hidden())) {
                node.state('collapsed', false);
                node.state('hidden', false);

                node._tree.emit('node.expanded', node);

                if (node._tree.isDynamic && node.children === true) {
                    node.loadChildren().then(resolve).catch(reject);
                }
                else {
                    node._tree.applyChanges();
                    resolve(node);
                }
            }
            else {
                // Resolve immediately
                resolve(node);
            }
        });
    }

    /**
     * Get weather node expanded.
     *
     * @return {boolean} True if expanded.
     */
    expanded() {
        return !this.collapsed();
    }

    /**
     * Expand parent nodes.
     *
     * @return {TreeNode} Node object.
     */
    expandParents() {
        if (this.hasParent()) {
            this.getParent().recurseUp((node) => {
                node.expand();
            });
        }

        return this;
    }

    /**
     * Focus a node without changing its selection.
     *
     * @return {TreeNode} Node object.
     */
    focus() {
        if (!this.focused()) {
            // Batch selection changes
            this._tree.batch();
            this._tree.blurDeep();
            this.state('focused', true);

            // Emit this event
            this._tree.emit('node.focused', this);

            // Mark hierarchy dirty and apply
            this.markDirty();
            this._tree.end();
        }

        return this;
    }

    /**
     * Get weather this node is focused.
     *
     * @return {boolean} True if node focused.
     */
    focused() {
        return this.state('focused');
    }

    /**
     * Get children for this node. If no children exist, an empty TreeNodes
     * collection is returned for safe chaining.
     *
     * @return {TreeNodes} Array of node objects.
     */
    getChildren() {
        return this.hasChildren() ? this.children : new TreeNodes(this._tree);
    }

    /**
     * Get the immediate parent, if any.
     *
     * @return {TreeNode} Node object.
     */
    getParent() {
        return this.itree.parent;
    }

    /**
     * Get parent nodes. Excludes any siblings.
     *
     * @return {TreeNodes} Node objects.
     */
    getParents() {
        let parents = new TreeNodes(this._tree);

        if (this.hasParent()) {
            this.getParent().recurseUp((node) => {
                parents.push(node);
            });
        }

        return parents;
    }

    /**
     * Get a textual hierarchy for a given node. An array
     * of text from this node's root ancestor to the given node.
     *
     * @return {array} Array of node texts.
     */
    getTextualHierarchy() {
        let paths = [];

        this.recurseUp((node) => {
            paths.unshift(node.text);
        });

        return paths;
    }

    /**
     * Get weather the given node is an ancestor of this node.
     *
     * @param {TreeNode} node Node object.
     * @return {boolean} True if node is an ancestor or the given node
     */
    hasAncestor(node) {
        let hasAncestor = false;
        this.recurseUp((n) => !(hasAncestor = n.id === node.id));

        return hasAncestor;
    }

    /**
     * Get weather node has any children.
     *
     * @return {boolean} True if has loaded children.
     */
    hasChildren() {
        return (_.isArrayLike(this.children) && this.children.length > 0);
    }

    /**
     * Get weather children have been loaded. Will always be true for non-dynamic nodes.
     *
     * @return {boolean} True if we've attempted to load children.
     */
    hasLoadedChildren() {
        return _.isArrayLike(this.children);
    }

    /**
     * Get weather node has any children, or allows dynamic loading.
     *
     * @return {boolean} True if node has, or will have children.
     */
    hasOrWillHaveChildren() {
        return _.isArrayLike(this.children) ? Boolean(this.children.length) : this.allowDynamicLoad();
    }

    /**
     * Get weather node has a parent.
     *
     * @return {boolean} True if has a parent.
     */
    hasParent() {
        return Boolean(this.itree.parent);
    }

    /**
     * Get weather node has any visible children.
     *
     * @return {boolean} True if children are visible.
     */
    hasVisibleChildren() {
        let hasVisibleChildren = false;

        if (this.hasChildren()) {
            hasVisibleChildren = (this.children.filterBy('available').length > 0);
        }

        return hasVisibleChildren;
    }

    /**
     * Hide this node.
     *
     * @return {TreeNode} Node object.
     */
    hide() {
        let node = baseStateChange('hidden', true, 'hidden', this);

        // Update children
        if (node.hasChildren()) {
            node.children.hide();
        }

        return node;
    }

    /**
     * Get weather this node is hidden.
     *
     * @return {boolean} True if node hidden.
     */
    hidden() {
        return this.state('hidden');
    }

    /**
     * Get a "path" of indices, values which map this node's location within all parent contexts.
     *
     * @return {string} Index path
     */
    indexPath() {
        let indices = [];

        this.recurseUp((node) => {
            indices.push(_.indexOf(node.context(), node));
        });

        return indices.reverse().join('.');
    }

    /**
     * Get weather this node is indeterminate.
     *
     * @return {boolean} True if node indeterminate.
     */
    indeterminate() {
        return this.state('indeterminate');
    }

    /**
     * Find the last + deepest visible child of the previous sibling.
     *
     * @return {TreeNode} Node object.
     */
    lastDeepestVisibleChild() {
        let found;

        if (this.hasChildren() && !this.collapsed()) {
            found = _.findLast(this.children, (node) => {
                return node.visible();
            });

            let res = found.lastDeepestVisibleChild();
            if (res) {
                found = res;
            }
        }

        return found;
    }

    /**
     * Initiate a dynamic load of children for a given node.
     *
     * This requires `tree.config.data` to be a function which accepts
     * three arguments: node, resolve, reject.
     *
     * Use the `node` to filter results.
     *
     * On load success, pass the result array to `resolve`.
     * On error, pass the Error to `reject`.
     *
     * @return {Promise} Promise resolving children nodes.
     */
    loadChildren() {
        return new Promise((resolve, reject) => {
            if (!this.allowDynamicLoad()) {
                return reject(new Error('Node does not have or support dynamic children.'));
            }

            this.state('loading', true);
            this.markDirty();
            this._tree.applyChanges();

            let complete = (nodes, totalNodes) => {
                // A little type-safety for silly situations
                if (!_.isArrayLike(nodes)) {
                    return reject(new TypeError('Loader requires an array-like `nodes` parameter.'));
                }

                this._tree.batch();
                this.state('loading', false);

                let model = collectionToModel(this._tree, nodes, this);
                if (_.isArrayLike(this.children)) {
                    this.children = this.children.concat(model);
                }
                else {
                    this.children = model;
                }

                if (_.parseInt(totalNodes) > nodes.length) {
                    this.children._pagination.total = _.parseInt(totalNodes);
                }

                // If using checkbox mode, share selection with newly loaded children
                if (this._tree.config.selection.mode === 'checkbox' && this.selected()) {
                    this.children.select();
                }

                this.markDirty();
                this._tree.end();

                resolve(this.children);

                this._tree.emit('children.loaded', this);
            };

            let error = (err) => {
                this.state('loading', false);
                this.children = new TreeNodes(this._tree);
                this.children._context = this;
                this.markDirty();
                this._tree.applyChanges();

                reject(err);

                this._tree.emit('tree.loaderror', err);
            };

            const pagination = this._tree.constructor.isTreeNodes(this.children) ? this.children.pagination() : null;
            let loader = this._tree.config.data(this, complete, error, pagination);

            // Data loader is likely a promise
            if (_.isObject(loader)) {
                standardizePromise(loader).then(complete).catch(error);
            }
        });
    }

    /**
     * Get weather this node is loading child data.
     *
     * @return {boolean} True if node's children are loading.
     */
    loading() {
        return this.state('loading');
    }

    /**
     * Load additional children.
     *
     * @param {Event} event Click or scroll event if DOM interaction triggered this call.
     * @return {Promise} Resolves with request results.
     */
    loadMore() {
        if (!this.children || this.children === true) {
            return Promise.reject(new Error('Children have not yet been loaded.'));
        }

        return this.children.loadMore();
    }

    /**
     * Mark node as dirty. For some systems this assists with rendering tracking.
     *
     * @return {TreeNode} Node object.
     */
    markDirty() {
        if (!this.itree.dirty) {
            this.itree.dirty = true;

            if (this.hasParent()) {
                this.getParent().markDirty();
            }
        }

        return this;
    }

    /**
     * Get whether this node was matched during the last search.
     *
     * @return {boolean} True if node matched.
     */
    matched() {
        return this.state('matched');
    }

    /**
     * Find the next visible sibling of our ancestor. Continues
     * seeking up the tree until a valid node is found or we
     * reach the root node.
     *
     * @return {TreeNode} Node object.
     */
    nextVisibleAncestralSiblingNode() {
        let next;

        if (this.hasParent()) {
            let parent = this.getParent();
            next = parent.nextVisibleSiblingNode();

            if (!next) {
                next = parent.nextVisibleAncestralSiblingNode();
            }
        }

        return next;
    }

    /**
     * Find next visible child node.
     *
     * @return {TreeNode} Node object, if any.
     */
    nextVisibleChildNode() {
        let next;

        if (this.hasChildren()) {
            next = _.find(this.children, (child) => {
                return child.visible();
            });
        }

        return next;
    }

    /**
     * Get the next visible node.
     *
     * @return {TreeNode} Node object if any.
     */
    nextVisibleNode() {
        let next;

        // 1. Any visible children
        next = this.nextVisibleChildNode();

        // 2. Any Siblings
        if (!next) {
            next = this.nextVisibleSiblingNode();
        }

        // 3. Find sibling of ancestor(s)
        if (!next) {
            next = this.nextVisibleAncestralSiblingNode();
        }

        return next;
    }

    /**
     * Find the next visible sibling node.
     *
     * @return {TreeNode} Node object, if any.
     */
    nextVisibleSiblingNode() {
        let context = (this.hasParent() ? this.getParent().children : this._tree.nodes());
        let i = _.findIndex(context, { id: this.id });

        return _.find(_.slice(context, i + 1), (node) => {
            return node.visible();
        });
    }

    /**
     * Get pagination object for this tree node.
     *
     * @return {object} Pagination configuration object.
     */
    pagination() {
        return _.get(this, 'children._pagination');
    }

    /**
     * Find the previous visible node.
     *
     * @return {TreeNode} Node object, if any.
     */
    previousVisibleNode() {
        let prev;

        // 1. Any Siblings
        prev = this.previousVisibleSiblingNode();

        // 2. If that sibling has children though, go there
        if (prev && prev.hasChildren() && !prev.collapsed()) {
            prev = prev.lastDeepestVisibleChild();
        }

        // 3. Parent
        if (!prev && this.hasParent()) {
            prev = this.getParent();
        }

        return prev;
    }

    /**
     * Find the previous visible sibling node.
     *
     * @return {TreeNode} Node object, if any.
     */
    previousVisibleSiblingNode() {
        let context = (this.hasParent() ? this.getParent().children : this._tree.nodes());
        let i = _.findIndex(context, { id: this.id });
        return _.findLast(_.slice(context, 0, i), (node) => {
            return node.visible();
        });
    }

    /**
     * Iterate down node and any children.
     *
     * @param {function} iteratee Iteratee function.
     * @return {TreeNode} Node object.
     */
    recurseDown(iteratee) {
        recurseDown(this, iteratee);

        return this;
    }

    /**
     * Iterate up a node and its parents.
     *
     * @param {function} iteratee Iteratee function.
     * @return {TreeNode} Node object.
     */
    recurseUp(iteratee) {
        let result = iteratee(this);

        if (result !== false && this.hasParent()) {
            this.getParent().recurseUp(iteratee);
        }

        return this;
    }

    /**
     * Update the indeterminate state of this node by scanning states of children.
     *
     * True if some, but not all children are checked.
     * False if no children are checked.
     *
     * @return {TreeNode} Node object.
     */
    refreshIndeterminateState() {
        let oldValue = this.indeterminate();
        this.state('indeterminate', false);

        if (this.hasChildren()) {
            let childrenCount = this.children.length;
            let indeterminate = 0;
            let checked = 0;

            this.children.each((n) => {
                if (n.checked()) {
                    checked++;
                }

                if (n.indeterminate()) {
                    indeterminate++;
                }
            });

            // Set selected if all children are
            if (checked === childrenCount) {
                baseStateChange('checked', true, 'checked', this);
            }
            else {
                baseStateChange('checked', false, 'unchecked', this);
            }

            // Set indeterminate if any children are, or some children are selected
            if (!this.checked()) {
                this.state('indeterminate', indeterminate > 0 || (childrenCount > 0 && checked > 0 && checked < childrenCount));
            }
        }

        if (this.hasParent()) {
            this.getParent().refreshIndeterminateState();
        }

        if (oldValue !== this.state('indeterminate')) {
            this.markDirty();
        }

        return this;
    }

    /**
     * Remove all current children and re-execute a loadChildren call.
     *
     * @return {Promise} Promise resolved on load.
     */
    reload() {
        return new Promise((resolve, reject) => {
            if (!this.allowDynamicLoad()) {
                return reject(new Error('Node or tree does not support dynamic children.'));
            }

            // Reset children
            this.children = true;

            // Collapse
            this.collapse();

            // Load and the proxy the promise
            this.loadChildren().then(resolve).catch(reject);
        });
    }

    /**
     * Remove a node from the tree.
     *
     * @param {boolean} includeState Include itree.state object.
     * @return {object} Removed tree node object.
     */
    remove(includeState = false) {
        // Cache parent before we remove the node
        let parent = this.getParent();

        // Remove self
        this.context().remove(this);

        // Refresh parent states
        if (parent) {
            parent.refreshIndeterminateState();
            parent.markDirty();
        }

        let pagination = parent ? parent.pagination() : this._tree.pagination();
        pagination.total--;

        // Export/event
        let exported = this.toObject(false, includeState);
        this._tree.emit('node.removed', exported, parent);

        this._tree.applyChanges();

        return exported;
    }

    /**
     * Get whether this node is soft-removed.
     *
     * @return {boolean} True if node soft-removed.
     */
    removed() {
        return this.state('removed');
    }

    /**
     * Get whether this node has been rendered.
     *
     * Will be false if deferred rendering is enable and the node has
     * not yet been loaded, or if a custom DOM renderer is used.
     *
     * @return {boolean} True if node rendered.
     */
    rendered() {
        return this.state('rendered');
    }

    /**
     * Restore state if soft-removed.
     *
     * @return {TreeNode} Node object.
     */
    restore() {
        return baseStateChange('removed', false, 'restored', this);
    }

    /**
     * Select this node.
     *
     * @param {boolean} shallow Skip auto-selecting children.
     * @return {TreeNode} Node object.
     */
    select(shallow) {
        if (!this.selected() && this.selectable()) {
            // Batch selection changes
            this._tree.batch();

            if (this._tree.canAutoDeselect()) {
                let oldVal = this._tree.config.selection.require;
                this._tree.config.selection.require = false;
                this._tree.deselectDeep();
                this._tree.config.selection.require = oldVal;
            }

            // Will we apply this state change to our children?
            let deep = !shallow && this._tree.config.selection.autoSelectChildren;

            baseStateChange('selected', true, 'selected', this, deep);

            // Cache as the last selected node
            this._tree._lastSelectedNode = this;

            // Mark hierarchy dirty and apply
            this.markDirty();
            this._tree.end();
        }

        return this;
    }

    /**
     * Get weather node selectable.
     *
     * @return {boolean} True if node selectable.
     */
    selectable() {
        let allow = this._tree.config.selection.allow(this);
        return typeof allow === 'boolean' ? allow : this.state('selectable');
    }

    /**
     * Get whether this node is selected.
     *
     * @return {boolean} True if node selected.
     */
    selected() {
        return this.state('selected');
    }

    /**
     * Set a root property on this node.
     *
     * @param {string|number} property Property name.
     * @param {*} value New value.
     * @return {TreeNode} Node object.
     */
    set(property, value) {
        this[property] = value;
        this.markDirty();

        this._tree.applyChanges();

        return this;
    }

    /**
     * Show this node.
     *
     * @return {TreeNode} Node object.
     */
    show() {
        return baseStateChange('hidden', false, 'shown', this);
    }

    /**
     * Get or set a state value.
     *
     * This is a base method and will not invoke related changes, for example
     * setting selected=false will not trigger any deselection logic.
     *
     * @param {string} name Property name.
     * @param {boolean} newVal New value, if setting.
     * @return {boolean} Current value on read, old value on set.
     */
    state(name, newVal) {
        let currentVal = this.itree.state[name];

        if (typeof newVal !== 'undefined' && currentVal !== newVal) {
            // Update values
            this.itree.state[name] = newVal;

            if (name !== 'rendered') {
                this.markDirty();
            }

            // Emit an event
            this._tree.emit('node.state.changed', this, name, currentVal, newVal);
        }

        return currentVal;
    }

    /**
     * Get or set multiple state values to a single value.
     *
     * @param {Array} names Property names.
     * @param {boolean} newVal New value, if setting.
     * @return {Array} Array of state booleans
     */
    states(names, newVal) {
        let results = [];

        this._tree.batch();

        _.each(names, (name) => {
            results.push(this.state(name, newVal));
        });

        this._tree.end();

        return results;
    }

    /**
     * Swap position with the given node.
     *
     * @param {TreeNode} node Node.
     * @return {TreeNode} Node objects.
     */
    swap(node) {
        this.context().swap(this, node);

        return this;
    }

    /**
     * Mark this node as "removed" without actually removing it.
     *
     * Expand/show methods will never reveal this node until restored.
     *
     * @return {TreeNode} Node object.
     */
    softRemove() {
        return baseStateChange('removed', true, 'softremoved', this, 'softRemove');
    }

    /**
     * Toggle checked state.
     *
     * @return {TreeNode} Node object.
     */
    toggleCheck() {
        return (this.checked() ? this.uncheck() : this.check());
    }

    /**
     * Toggle collapsed state.
     *
     * @return {TreeNode} Node object.
     */
    toggleCollapse() {
        return (this.collapsed() ? this.expand() : this.collapse());
    }

    /**
     * Toggle editing state.
     *
     * @return {TreeNode} Node object.
     */
    toggleEditing() {
        this.state('editing', !this.state('editing'));

        this.markDirty();
        this._tree.applyChanges();

        return this;
    }

    /**
     * Toggle selected state.
     *
     * @return {TreeNode} Node object.
     */
    toggleSelect() {
        return (this.selected() ? this.deselect() : this.select());
    }

    /**
     * Export this node as a native Object.
     *
     * @param {boolean} excludeChildren Exclude children.
     * @param {boolean} includeState Include itree.state object.
     * @return {object} Node object.
     */
    toObject(excludeChildren = false, includeState = false) {
        let exported = {};

        const keys = _.pull(Object.keys(this), '_tree', 'children', 'itree');

        // Map keys
        _.each(keys, (keyName) => {
            exported[keyName] = this[keyName];
        });

        // Copy over whitelisted itree data
        // Excludes internal-use junk like parent, dirty, ref
        const itree = exported.itree = {};
        itree.a = this.itree.a;
        itree.icon = this.itree.icon;
        itree.li = this.itree.li;

        if (includeState) {
            itree.state = this.itree.state;
        }

        // If including children, export them
        if (!excludeChildren && this.hasChildren() && _.isFunction(this.children.toArray)) {
            exported.children = this.children.toArray();
        }

        return exported;
    }

    /**
     * Get the text content of this tree node.
     *
     * @return {string} Text content.
     */
    toString() {
        return this.text;
    }

    /**
     * Get the tree this node ultimately belongs to.
     *
     * @return {InspireTree} Tree instance.
     */
    tree() {
        return this.context().tree();
    }

    /**
     * Uncheck this node.
     *
     * @param {boolean} shallow Skip auto-unchecking children.
     * @return {TreeNode} Node object.
     */
    uncheck(shallow) {
        this._tree.batch();

        // Will we apply this state change to our children?
        let deep = !shallow && this._tree.config.checkbox.autoCheckChildren;

        baseStateChange('checked', false, 'unchecked', this, deep);

        // Reset indeterminate state
        this.state('indeterminate', false);

        // Refresh our parent
        if (this.hasParent()) {
            this.getParent().refreshIndeterminateState();
        }

        this._tree.end();

        return this;
    };

    /**
     * Get whether node is visible to a user. Returns false
     * if it's hidden, or if any ancestor is hidden or collapsed.
     *
     * @return {boolean} Whether visible.
     */
    visible() {
        let isVisible = true;
        if (this.hidden() || this.removed() || (this._tree.usesNativeDOM && !this.rendered())) {
            isVisible = false;
        }
        else if (this.hasParent()) {
            if (this.getParent().collapsed()) {
                isVisible = false;
            }
            else {
                isVisible = this.getParent().visible();
            }
        }
        else {
            isVisible = true;
        }

        return isVisible;
    }
}

export default TreeNode;
