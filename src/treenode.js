'use strict';

// Libs
import * as _ from 'lodash';
import { baseStateChange } from './lib/base-state-change';
import { collectionToModel } from './lib/collection-to-model';
import { objectToNode } from './lib/object-to-node';
import { Promise } from 'es6-promise';
import { recurseDown } from './lib/recurse-down';
import { standardizePromise } from './lib/standardize-promise';
import { TreeNodes } from './treenodes';

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
 * @category TreeNode
 * @param {TreeNode} source TreeNode to copy.
 * @return {TreeNode} Tree node object.
 */
export class TreeNode {
    constructor(tree, source, excludeKeys) {
        this._tree = tree;

        if (source instanceof TreeNode) {
            excludeKeys = _.castArray(excludeKeys);
            excludeKeys.push('_tree');

            // Iterate manually for better perf
            _.each(source, (value, key) => {
                // Skip vars
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
     * @category TreeNode
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
     * @category TreeNode
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
     * @return {boolean} If tree/node allows dynamic children.
     */
    allowDynamicLoad() {
        return this._tree.isDynamic && (_.isArrayLike(this.children) || this.children === true);
    }

    /**
     * Get if node available.
     *
     * @category TreeNode
     * @return {boolean} If available.
     */
    available() {
        return (!this.hidden() && !this.removed());
    }

    /**
     * Blur focus from this node.
     *
     * @category TreeNode
     * @return {TreeNode} Node object.
     */
    blur() {
        this.state('editing', false);

        return baseStateChange('focused', false, 'blurred', this);
    };

    /**
     * Marks this node as checked.
     *
     * @category TreeNode
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
     * @category TreeNode
     * @return {boolean} Get if node checked.
     */
    checked() {
        return this.state('checked');
    }

    /**
     * Hides parents without any visible children.
     *
     * @category TreeNode
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
     * Clones this node.
     *
     * @category TreeNode
     * @param {array} excludeKeys Keys to exclude from the clone.
     * @return {TreeNode} New node object.
     */
    clone(excludeKeys) {
        return new TreeNode(this._tree, this, excludeKeys);
    }

    /**
     * Collapse this node.
     *
     * @category TreeNode
     * @return {TreeNode} Node object.
     */
    collapse() {
        return baseStateChange('collapsed', true, 'collapsed', this);
    }

    /**
     * Get whether this node is collapsed.
     *
     * @category TreeNode
     * @return {boolean} Get if node collapsed.
     */
    collapsed() {
        return this.state('collapsed');
    }

    /**
     * Get the containing context. If no parent present, the root context is returned.
     *
     * @category TreeNode
     * @return {TreeNodes} Node array object.
     */
    context() {
        return this.hasParent() ? this.getParent().children : this._tree.model;
    }

    /**
     * Copies node to a new tree instance.
     *
     * @category TreeNode
     * @param {boolean} hierarchy Include necessary ancestors to match hierarchy.
     * @return {object} Property "to" for defining destination.
     */
    copy(hierarchy) {
        let node = this;

        if (hierarchy) {
            node = node.copyHierarchy();
        }

        return {

            /**
             * Sets a destination.
             *
             * @category CopyNode
             * @param {object} dest Destination Inspire Tree.
             * @return {object} New node object.
             */
            to: (dest) => {
                if (!_.isFunction(dest.addNode)) {
                    throw new Error('Destination must be an Inspire Tree instance.');
                }

                return dest.addNode(node.toObject());
            }
        };
    }

    /**
     * Copies all parents of a node.
     *
     * @category TreeNode
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
                clone.children = this.children.filter((n) => {
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
     * @category TreeNode
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
     * Get if node editable. Required editing.edit to be enable via config.
     *
     * @category TreeNode
     * @return {boolean} If node editable.
     */
    editable() {
        return this._tree.config.editable && this._tree.config.editing.edit && this.state('editable');
    }

    /**
     * Get if node is currently in edit mode.
     *
     * @category TreeNode
     * @return {boolean} If node in edit mode.
     */
    editing() {
        return this.state('editing');
    }

    /**
     * Expand this node.
     *
     * @category TreeNode
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
                    node.markDirty();
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
     * Get if node expanded.
     *
     * @category TreeNode
     * @return {boolean} If expanded.
     */
    expanded() {
        return !this.collapsed();
    }

    /**
     * Expand parent nodes.
     *
     * @category TreeNode
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
     * @category TreeNode
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
     * Get whether this node is focused.
     *
     * @category TreeNode
     * @return {boolean} Get if node focused.
     */
    focused() {
        return this.state('focused');
    }

    /**
     * Get children for this node. If no children exist, an empty TreeNodes
     * collection is returned for safe chaining.
     *
     * @category TreeNode
     * @return {TreeNodes} Array of node objects.
     */
    getChildren() {
        return this.hasChildren() ? this.children : new TreeNodes(this._tree);
    }

    /**
     * Get the immediate parent, if any.
     *
     * @category TreeNode
     * @return {TreeNode} Node object.
     */
    getParent() {
        return this.itree.parent;
    }

    /**
     * Returns parent nodes. Excludes any siblings.
     *
     * @category TreeNode
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
     * @category TreeNode
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
     * If node has any children.
     *
     * @category TreeNode
     * @return {boolean} If children.
     */
    hasChildren() {
        return (_.isArrayLike(this.children) && this.children.length > 0);
    }

    /**
     * If children loading method has completed. Will always be true for non-dynamic nodes.
     *
     * @category TreeNode
     * @return {boolean} If we've attempted to load children.
     */
    hasLoadedChildren() {
        return _.isArrayLike(this.children);
    }

    /**
     * If node has a parent.
     *
     * @category TreeNode
     * @return {boolean} If parent.
     */
    hasParent() {
        return Boolean(this.itree.parent);
    }

    /**
     * If node has any visible children.
     *
     * @category TreeNode
     * @return {boolean} If visible children.
     */
    hasVisibleChildren() {
        let hasVisibleChildren = false;

        if (this.hasChildren()) {
            hasVisibleChildren = (this.children.filter('available').length > 0);
        }

        return hasVisibleChildren;
    }

    /**
     * Hide this node.
     *
     * @category TreeNode
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
     * Get whether this node is hidden.
     *
     * @category TreeNode
     * @return {boolean} Get if node hidden.
     */
    hidden() {
        return this.state('hidden');
    }

    /**
     * Returns a "path" of indices, values which map this node's location within all parent contexts.
     *
     * @category TreeNode
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
     * Get whether this node is indeterminate.
     *
     * @category TreeNode
     * @return {boolean} Get if node indeterminate.
     */
    indeterminate() {
        return this.state('indeterminate');
    }

    /**
     * Find the last + deepest visible child of the previous sibling.
     *
     * @category TreeNode
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
     * @category TreeNode
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

            var pagination = this._tree.isTreeNodes(this.children) ? this.children.pagination() : null;

            let loader = this._tree.config.data(this, complete, error, pagination);

            // Data loader is likely a promise
            if (_.isObject(loader)) {
                standardizePromise(loader).then(complete).catch(error);
            }
        });
    }

    /**
     * Get whether this node is loading child data.
     *
     * @category TreeNode
     * @return {boolean} Get if node loading.
     */
    loading() {
        return this.state('loading');
    }

    /**
     * Loads additional child nodes.
     *
     * @category Tree
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
     * Mark a node as dirty, rebuilding this node in the virtual DOM
     * and rerendering to the live DOM, next time applyChanges is called.
     *
     * @category TreeNode
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
     * @category TreeNode
     * @return {boolean} Get if node matched.
     */
    matched() {
        return this.state('matched');
    }

    /**
     * Find the next visible sibling of our ancestor. Continues
     * seeking up the tree until a valid node is found or we
     * reach the root node.
     *
     * @category TreeNode
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
     * @category TreeNode
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
     * @category TreeNode
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
     * @category TreeNode
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
     * @category TreeNode
     * @return {object} Pagination configuration object.
     */
    pagination() {
        return _.get(this, 'children._pagination');
    }

    /**
     * Find the previous visible node.
     *
     * @category TreeNode
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
     * @category TreeNode
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
     * @category TreeNode
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
     * @category TreeNode
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
     * Updates the indeterminate state of this node.
     *
     * True if some, but not all children are checked.
     * False if no children are checked.
     *
     * @category TreeNode
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
     * Removes all current children and re-executes a loadChildren call.
     *
     * @category TreeNode
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
     * @category TreeNode
     * @return {object} Removed tree node object.
     */
    remove() {
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
        let exported = this.toObject();
        this._tree.emit('node.removed', exported, parent);

        this._tree.applyChanges();

        return exported;
    }

    /**
     * Get whether this node is soft-removed.
     *
     * @category TreeNode
     * @return {boolean} Get if node removed.
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
     * @category TreeNode
     * @return {boolean} Get if node rendered.
     */
    rendered() {
        return this.state('rendered');
    }

    /**
     * Restore state if soft-removed.
     *
     * @category TreeNode
     * @return {TreeNode} Node object.
     */
    restore() {
        return baseStateChange('removed', false, 'restored', this);
    }

    /**
     * Select this node.
     *
     * @category TreeNode
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
     * Get if node selectable.
     *
     * @category TreeNode
     * @return {boolean} If node selectable.
     */
    selectable() {
        let allow = this._tree.config.selection.allow(this);
        return typeof allow === 'boolean' ? allow : this.state('selectable');
    }

    /**
     * Get whether this node is selected.
     *
     * @category TreeNode
     * @return {boolean} Get if node selected.
     */
    selected() {
        return this.state('selected');
    }

    /**
     * Set a root property on this node.
     *
     * @category TreeNode
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
     * @category TreeNode
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
     * @category TreeNode
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
     * Mark this node as "removed" without actually removing it.
     *
     * Expand/show methods will never reveal this node until restored.
     *
     * @category TreeNode
     * @return {TreeNode} Node object.
     */
    softRemove() {
        return baseStateChange('removed', true, 'softremoved', this, 'softRemove');
    }

    /**
     * Toggles checked state.
     *
     * @category TreeNode
     * @return {TreeNode} Node object.
     */
    toggleCheck() {
        return (this.checked() ? this.uncheck() : this.check());
    }

    /**
     * Toggles collapsed state.
     *
     * @category TreeNode
     * @return {TreeNode} Node object.
     */
    toggleCollapse() {
        return (this.collapsed() ? this.expand() : this.collapse());
    }

    /**
     * Toggles editing state.
     *
     * @category TreeNode
     * @return {TreeNode} Node object.
     */
    toggleEditing() {
        this.state('editing', !this.state('editing'));

        this.markDirty();
        this._tree.applyChanges();

        return this;
    }

    /**
     * Toggles selected state.
     *
     * @category TreeNode
     * @return {TreeNode} Node object.
     */
    toggleSelect() {
        return (this.selected() ? this.deselect() : this.select());
    }

    /**
     * Export this node as a native Object.
     *
     * @category TreeNode
     * @param {boolean} excludeChildren Exclude children.
     * @return {object} Node object.
     */
    toObject(excludeChildren) {
        let object = {};

        _.each(this, (v, k) => {
            if (k !== '_tree' && k !== 'children' && k !== 'itree') {
                object[k] = v;
            }
        });

        if (!excludeChildren && this.hasChildren() && _.isFunction(this.children.toArray)) {
            object.children = this.children.toArray();
        }

        return object;
    }

    /**
     * Unchecks this node.
     *
     * @category TreeNode
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
     * Checks whether a node is visible to a user. Returns false
     * if it's hidden, or if any ancestor is hidden or collapsed.
     *
     * @category TreeNode
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
