'use strict';

// Libs
import _ from 'lodash';
import cuid from 'cuid';
import EventEmitter from 'eventemitter2';
import { Promise } from 'es6-promise';

// CSS
require('./scss/tree.scss');

function InspireTree(opts) {
    var initialized = false;
    var noop = function() {};
    var tree = this;
    tree.preventDeselection = false;

    if (!opts.data) {
        throw new TypeError('Invalid data loader.');
    }

    // Assign defaults
    tree.config = _.defaults(opts, {
        allowLoadEvents: [],
        allowSelection: noop,
        checkbox: false,
        contextMenu: false,
        dragTargets: false,
        multiselect: false,
        renderer: false,
        requireSelection: false,
        search: false,
        sort: false,
        tabindex: -1
    });

    if (tree.config.checkbox) {
        tree.config.multiselect = true;
        tree.preventDeselection = true;
    }

    // Default node state values
    var defaultState = {
        collapsed: true,
        focused: false,
        hidden: false,
        indeterminate: false,
        loading: false,
        removed: false,
        selectable: true,
        selected: false
    };

    // Cache some configs
    var allowsLoadEvents = _.isArray(tree.config.allowLoadEvents) && tree.config.allowLoadEvents.length > 0;
    var isDynamic = _.isFunction(tree.config.data);

    // Rendering
    var dom;

    // Webpack has a DOM boolean that when false,
    // allows us to exclude this library from our build.
    // For those doing their own rendering, it's useless.
    if (DOM) {
        dom = new (require('./dom'))(tree);
    }

    // Validation
    if (dom && (!_.isObject(opts) || !opts.target)) {
        throw new TypeError('Property "target" is required, either an element or a selector.');
    }

    // Load custom/empty renderer
    if (!dom) {
        dom = _.isFunction(tree.config.renderer) ? tree.config.renderer(tree) : {
            applyChanges: noop,
            attach: noop,
            batch: noop,
            end: noop
        };
    }

    /**
     * Represents a singe node object within the tree.
     *
     * @param {TreeNode} source TreeNode to copy.
     * @return {TreeNode} Tree node object.
     */
    function TreeNode(source) {
        var node = this;

        _.each(source, function(value, key) {
            if (_.isObject(value)) {
                if (_.isFunction(value.clone)) {
                    node[key] = value.clone();
                }
                else {
                    node[key] = _.cloneDeep(value);
                }
            }
            else {
                node[key] = value;
            }
        });
    };

    /**
     * Add a child to this node.
     *
     * @category TreeNode
     * @param {object} child Node object.
     * @return {TreeNode} Node object.
     */
    TreeNode.prototype.addChild = function(child) {
        child = objectToModel(child);

        if (_.isArray(this.children) || !_.isArrayLike(this.children)) {
            this.children = new TreeNodes();
        }

        child.itree.parent = this;
        this.children.push(child);
        this.refreshIndeterminateState();

        child.markDirty();
        dom.applyChanges();

        return child;
    };

    /**
     * Get if node available.
     *
     * @category TreeNode
     * @return {boolean} If available.
     */
    TreeNode.prototype.available = function() {
        return (!this.hidden() && !this.removed());
    };

    /**
     * Blur focus from this node.
     *
     * @category TreeNode
     * @return {TreeNode} Node object.
     */
    TreeNode.prototype.blur = function() {
        return baseStateChange('focused', false, 'blurred', this);
    };

    /**
     * Hides parents without any visible children.
     *
     * @category TreeNode
     * @return {TreeNode} Node object.
     */
    TreeNode.prototype.clean = function() {
        this.recurseUp(function(node) {
            if (node.hasParent()) {
                var parent = node.getParent();
                if (!parent.hasVisibleChildren()) {
                    parent.hide();
                }
            }
        });

        return this;
    };

    /**
     * Clones this node.
     *
     * @category TreeNode
     * @return {TreeNode} New node object.
     */
    TreeNode.prototype.clone = function() {
        var newClone = new TreeNode(this);

        if (this.hasChildren()) {
            newClone.children = this.children.clone();
        }

        return newClone;
    };

    /**
     * Collapse this node.
     *
     * @category TreeNode
     * @return {TreeNode} Node object.
     */
    TreeNode.prototype.collapse = function() {
        return baseStateChange('collapsed', true, 'collapsed', this);
    };

    /**
     * Get if node collapsed.
     *
     * @category TreeNode
     * @return {boolean} If collapsed.
     */
    TreeNode.prototype.collapsed = function() {
        return this.itree.state.collapsed;
    };

    /**
     * Get the containing context. If no parent present, the root context is returned.
     *
     * @category TreeNode
     * @return {TreeNodes} Node array object.
     */
    TreeNode.prototype.context = function() {
        return this.hasParent() ? this.getParent().children : model;
    };

    /**
     * Copies node to a new tree instance.
     *
     * @category TreeNode
     * @param {boolean} hierarchy Include necessary ancestors to match hierarchy.
     * @return {object} Property "to" for defining destination.
     */
    TreeNode.prototype.copy = function(hierarchy) {
        var node = this;

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
            to: function(dest) {
                if (!_.isFunction(dest.addNode)) {
                    throw new Error('Destination must be an Inspire Tree instance.');
                }

                return dest.addNode(node.export());
            }
        };
    };

    /**
     * Copies all parents of a node.
     *
     * @category TreeNode
     * @param {boolean} excludeNode Exclude given node from hierarchy.
     * @return {TreeNode} Root node object with hierarchy.
     */
    TreeNode.prototype.copyHierarchy = function(excludeNode) {
        var node = this;
        var parents = node.getParents();

        var nodes = [];

        // Remove old hierarchy data
        _.each(parents, function(node) {
            var clone = _.clone(node);
            delete clone.itree.parent;
            delete clone.children;

            nodes.push(clone);
        });

        parents = nodes.reverse();

        if (!excludeNode) {
            nodes.push(node);
        }

        var hierarchy = nodes[0];
        var pointer = hierarchy;
        var l = nodes.length;
        _.each(nodes, function(parent, key) {
            var children = new TreeNodes();

            if (key + 1 < l) {
                children.push(nodes[key + 1]);
                pointer.children = children;

                pointer = pointer.children[0];
            }
        });

        return hierarchy;
    };

    /**
     * Deselect this node.
     *
     * If requireSelection is true and this is the last selected
     * node, the node will remain in a selected state.
     *
     * @category TreeNode
     * @param {boolean} skipParentIndeterminate Skip refreshing parent indeterminate states.
     * @return {TreeNode} Node object.
     */
    TreeNode.prototype.deselect = function(skipParentIndeterminate) {
        if (!tree.config.requireSelection || tree.selected().length > 1) {
            var node = this;
            dom.batch();

            node.itree.state.indeterminate = false;
            baseStateChange('selected', false, 'deselected', this);

            // If using checkbox model
            if (tree.config.checkbox) {
                // Deselect all children
                if (node.hasChildren()) {
                    node.children.recurseDown(function(child) {
                        child.deselect(true);
                    });
                }

                if (!skipParentIndeterminate && node.hasParent()) {
                    node.getParent().refreshIndeterminateState();
                }
            }

            dom.end();
        }

        return this;
    };

    /**
     * Expand this node.
     *
     * @category TreeNode
     * @return {Promise} Promise resolved on successful load and expand of children.
     */
    TreeNode.prototype.expand = function() {
        var node = this;

        return new Promise(function(resolve, reject) {
            var allow = (node.hasChildren() || (isDynamic && node.children === true));

            if (allow && (node.collapsed() || node.hidden())) {
                node.itree.state.collapsed = false;
                node.itree.state.hidden = false;

                tree.emit('node.expanded', node);

                if (isDynamic && node.children === true) {
                    node.loadChildren().then(resolve).catch(reject);
                }
                else {
                    node.markDirty();
                    dom.applyChanges();
                    resolve(node);
                }
            }
            else {
                // Resolve immediately
                resolve(node);
            }
        });
    };

    /**
     * Expand parent nodes.
     *
     * @category TreeNode
     * @return {TreeNode} Node object.
     */
    TreeNode.prototype.expandParents = function() {
        if (this.hasParent()) {
            this.getParent().recurseUp(function(node) {
                node.expand();
            });
        }

        return this;
    };

    /**
     * Get if node expanded.
     *
     * @category TreeNode
     * @return {boolean} If expanded.
     */
    TreeNode.prototype.expanded = function() {
        return !this.collapsed();
    };

    /**
     * Clones a node, removes itree property, and returns it
     * as a native object.
     *
     * Note: does not use node.clone() because we don't want a
     * TreeNode and we need to avoid redundant cloning children.
     *
     * @category TreeNode
     * @return {object} Cloned/modified node object.
     */
    TreeNode.prototype.export = function() {
        var clone = _.clone(this);
        delete clone.itree;

        if (clone.hasChildren()) {
            clone.children = clone.children.export();
        }

        return clone.toObject();
    };

    /**
     * Focus a node without changing its selection.
     *
     * @category TreeNode
     * @return {TreeNode} Node object.
     */
    TreeNode.prototype.focus = function() {
        var node = this;

        if (!node.focused()) {
            // Batch selection changes
            dom.batch();
            tree.nodes().blurDeep();
            node.itree.state.focused = true;

            // Emit this event
            tree.emit('node.focused', node);

            // Mark hierarchy dirty and apply
            node.markDirty();
            dom.end();
        }

        return node;
    };

    /**
     * Get whether node has focus or not.
     *
     * @category TreeNode
     * @return {boolean} If focused.
     */
    TreeNode.prototype.focused = function() {
        return this.itree.state.focused;
    };

    /**
     * Get children for this node. If no children exist, an empty TreeNodes
     * collection is returned for safe chaining.
     *
     * @category TreeNode
     * @return {TreeNodes} Array of node objects.
     */
    TreeNode.prototype.getChildren = function() {
        return this.hasChildren() ? this.children : new TreeNodes();
    };

    /**
     * Get the immediate parent, if any.
     *
     * @category TreeNode
     * @return {TreeNode} Node object.
     */
    TreeNode.prototype.getParent = function() {
        return this.itree.parent;
    };

    /**
     * Returns parent nodes. Excludes any siblings.
     *
     * @category TreeNode
     * @return {TreeNodes} Node objects.
     */
    TreeNode.prototype.getParents = function() {
        var parents = new TreeNodes();

        if (this.hasParent()) {
            this.getParent().recurseUp(function(node) {
                parents.push(node);
            });
        }

        return parents;
    };

    /**
     * Get a textual hierarchy for a given node. An array
     * of text from this node's root ancestor to the given node.
     *
     * @category TreeNode
     * @return {array} Array of node texts.
     */
    TreeNode.prototype.getTextualHierarchy = function() {
        var paths = [];

        this.recurseUp(function(node) {
            paths.unshift(node.text);
        });

        return paths;
    };

    /**
     * If node has any children.
     *
     * @category TreeNode
     * @return {boolean} If children.
     */
    TreeNode.prototype.hasChildren = function() {
        return (_.isArrayLike(this.children) && this.children.length > 0);
    };

    /**
     * If node has a parent.
     *
     * @category TreeNode
     * @return {boolean} If parent.
     */
    TreeNode.prototype.hasParent = function() {
        return Boolean(this.itree.parent);
    };

    /**
     * If node has any visible children.
     *
     * @category TreeNode
     * @return {boolean} If visible children.
     */
    TreeNode.prototype.hasVisibleChildren = function() {
        var hasVisibleChildren = false;

        if (this.hasChildren()) {
            // Count visible children
            // http://jsperf.com/count-subdoc-state/2
            var visibleCount = 0;
            _.each(this.children, function(child) {
                if (!child.hidden() && !child.removed()) {
                    visibleCount++;
                }
            });

            hasVisibleChildren = (visibleCount > 0);
        }

        return hasVisibleChildren;
    };

    /**
     * Get if node hidden.
     *
     * @category TreeNode
     * @return {boolean} If hidden.
     */
    TreeNode.prototype.hidden = function() {
        return this.itree.state.hidden;
    };

    /**
     * Hide this node.
     *
     * @category TreeNode
     * @return {object} Node object.
     */
    TreeNode.prototype.hide = function() {
        var node = baseStateChange('hidden', true, 'hidden', this);

        // Update children
        if (node.hasChildren()) {
            node.children.hide();
        }

        return node;
    };

    /**
     * Returns a "path" of indices, values which map this node's location within all parent contexts.
     *
     * @return {string} [description]
     */
    TreeNode.prototype.indexPath = function() {
        var indices = [];

        this.recurseUp(function(node) {
            indices.push(_.indexOf(node.context(), node));
        });

        return indices.reverse().join('.');
    };

    /**
     * Find the last + deepest visible child of the previous sibling.
     *
     * @category TreeNode
     * @return {TreeNode} Node object.
     */
    TreeNode.prototype.lastDeepestVisibleChild = function() {
        var found;

        if (this.hasChildren() && !this.collapsed()) {
            found = _.findLast(this.children, function(node) {
                return node.visible();
            });

            var res = found.lastDeepestVisibleChild();
            if (res) {
                found = res;
            }
        }

        return found;
    };

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
     * @return {TreeNode} Node object.
     */
    TreeNode.prototype.loadChildren = function() {
        var node = this;

        return new Promise(function(resolve, reject) {
            if (!isDynamic || node.children !== true) {
                reject(new Error('Node does not have or support dynamic children.'));
            }

            node.itree.state.loading = true;
            node.markDirty();
            dom.applyChanges();

            tree.config.data(
                node,
                function resolver(results) {
                    dom.batch();
                    node.itree.state.loading = false;
                    node.children = collectionToModel(results, node);
                    node.markDirty();
                    dom.end();

                    resolve(node.children);

                    tree.emit('children.loaded', node);
                },
                function rejecter(err) {
                    node.itree.state.loading = false;
                    node.children = new TreeNodes();
                    node.markDirty();
                    dom.applyChanges();

                    reject(err);

                    tree.emit('tree.loaderror', err);
                }
            );
        });
    };

    /**
     * Mark a node as dirty, rebuilding this node in the virtual DOM
     * and rerendering to the live DOM, next time applyChanges is called.
     *
     * @category TreeNode
     * @return {TreeNode} Node object.
     */
    TreeNode.prototype.markDirty = function() {
        if (!this.itree.dirty) {
            this.itree.dirty = true;

            if (this.hasParent()) {
                this.getParent().markDirty();
            }
        }

        return this;
    };

    /**
     * Find next visible child node.
     *
     * @category TreeNode
     * @return {TreeNode} Node object, if any.
     */
    TreeNode.prototype.nextVisibleChildNode = function() {
        var startingNode = this;
        var next;

        if (startingNode.hasChildren()) {
            next = _.find(startingNode.children, function(child) {
                return child.visible();
            });
        }

        return next;
    };

    /**
     * Get the next visible node.
     *
     * @category TreeNode
     * @return {TreeNode} Node object if any.
     */
    TreeNode.prototype.nextVisibleNode = function() {
        var startingNode = this;
        var next;

        // 1. Any visible children
        next = startingNode.nextVisibleChildNode();

        // 2. Any Siblings
        if (!next) {
            next = startingNode.nextVisibleSiblingNode();
        }

        // 3. Find sibling of ancestor(s)
        if (!next) {
            next = startingNode.nextVisibleAncestralSiblingNode();
        }

        return next;
    };

    /**
     * Find the next visible sibling of our ancestor. Continues
     * seeking up the tree until a valid node is found or we
     * reach the root node.
     *
     * @category TreeNode
     * @return {TreeNode} Node object.
     */
    TreeNode.prototype.nextVisibleAncestralSiblingNode = function() {
        var next;

        if (this.hasParent()) {
            var parent = this.getParent();
            next = parent.nextVisibleSiblingNode();

            if (!next) {
                next = parent.nextVisibleAncestralSiblingNode();
            }
        }

        return next;
    };

    /**
     * Find the next visible sibling node.
     *
     * @category TreeNode
     * @return {object} Node object, if any.
     */
    TreeNode.prototype.nextVisibleSiblingNode = function() {
        var startingNode = this;
        var context = (startingNode.hasParent() ? startingNode.getParent().children : tree.nodes());
        var i = _.findIndex(context, { id: startingNode.id });

        return _.find(_.slice(context, i + 1), function(node) {
            return node.visible();
        });
    };

    /**
     * Find the previous visible node.
     *
     * @category TreeNode
     * @return {TreeNode} Node object, if any.
     */
    TreeNode.prototype.previousVisibleNode = function() {
        var startingNode = this;
        var prev;

        // 1. Any Siblings
        prev = startingNode.previousVisibleSiblingNode();

        // 2. If that sibling has children though, go there
        if (prev && prev.hasChildren() && !prev.collapsed()) {
            prev = prev.lastDeepestVisibleChild();
        }

        // 3. Parent
        if (!prev && startingNode.hasParent()) {
            prev = startingNode.getParent();
        }

        return prev;
    };

    /**
     * Find the previous visible sibling node.
     *
     * @category TreeNode
     * @return {TreeNode} Node object, if any.
     */
    TreeNode.prototype.previousVisibleSiblingNode = function() {
        var context = (this.hasParent() ? this.getParent().children : tree.nodes());
        var i = _.findIndex(context, { id: this.id });
        return _.findLast(_.slice(context, 0, i), function(node) {
            return node.visible();
        });
    };

    /**
     * Iterate up a node and its parents.
     *
     * @category TreeNode
     * @param {function} iteratee Iteratee function.
     * @return {TreeNode} Resulting node.
     */
    TreeNode.prototype.recurseUp = function(iteratee) {
        var result = iteratee(this);

        if (result !== false && this.hasParent()) {
            this.getParent().recurseUp(iteratee);
        }

        return this;
    };

    /**
     * Iterate down node and any children.
     *
     * @category TreeNode
     * @param {function} iteratee Iteratee function.
     * @return {TreeNode} Resulting node.
     */
    TreeNode.prototype.recurseDown = function(iteratee) {
        recurseDown(this, iteratee);

        return this;
    };

    /**
     * Updates the indeterminate state of this node.
     *
     * Only available when checkbox=true.
     * True if some, but not all children are selected.
     * False if no children are selected.
     *
     * @category TreeNode
     * @return {TreeNode} Node object.
     */
    TreeNode.prototype.refreshIndeterminateState = function() {
        var node = this;
        node.itree.state.indeterminate = false;

        if (tree.config.checkbox) {
            var childrenCount = node.children.length;
            var oldValue = node.itree.state.indeterminate;

            if (node.hasChildren()) {
                var selected = 0;

                _.each(node.children, function(child) {
                    if (child.itree.state.indeterminate) {
                        node.itree.state.indeterminate = true;
                        return false;
                    }
                    else if (child.selected()) {
                        selected++;
                    }
                });

                if (!selected) {
                    node.itree.state.selected = false;
                }
                else if (selected === childrenCount) {
                    node.itree.state.selected = true;
                }
                else if (!node.itree.state.indeterminate) {
                    node.itree.state.indeterminate = selected > 0 && selected < childrenCount;
                }
            }

            if (node.hasParent()) {
                node.getParent().refreshIndeterminateState();
            }

            if (oldValue !== node.itree.state.indeterminate) {
                node.markDirty();
            }
        }

        return node;
    };

    /**
     * Remove a node from the tree.
     *
     * @category TreeNode
     * @return {void}
     */
    TreeNode.prototype.remove = function() {
        var node = this;

        var parent;
        if (node.hasParent()) {
            parent = node.getParent();
        }

        var context = (parent ? parent.children : model);
        _.remove(context, { id: node.id });

        if (parent) {
            parent.refreshIndeterminateState();
        }

        tree.emit('node.removed', node.export());

        dom.applyChanges();
    };

    /**
     * Get if node soft-removed.
     *
     * @category TreeNode
     * @return {boolean} If soft-removed.
     */
    TreeNode.prototype.removed = function() {
        return this.itree.state.removed;
    };

    /**
     * Restore state if soft-removed.
     *
     * @category TreeNode
     * @return {TreeNode} Node object.
     */
    TreeNode.prototype.restore = function() {
        return baseStateChange('removed', false, 'restored', this);
    };

    /**
     * Select this node.
     *
     * @category TreeNode
     * @return {TreeNode} Node object.
     */
    TreeNode.prototype.select = function() {
        var node = this;

        if (!node.selected() && node.selectable()) {
            // Batch selection changes
            dom.batch();

            node.focus();

            if (!tree.preventDeselection) {
                var oldVal = tree.config.requireSelection;
                tree.config.requireSelection = false;
                tree.nodes().deselectDeep();
                tree.config.requireSelection = oldVal;
            }

            node.itree.state.selected = true;

            // If using checkbox model and we have children
            if (tree.config.checkbox) {
                if (node.hasChildren()) {
                    node.children.recurseDown(function(child) {
                        child.select();
                    });
                }

                if (node.hasParent()) {
                    node.getParent().refreshIndeterminateState();
                }
            }

            // Emit this event
            tree.emit('node.selected', node);

            // Mark hierarchy dirty and apply
            node.markDirty();
            dom.end();
        }

        return node;
    };

    /**
     * Get if node selectable.
     *
     * @category TreeNode
     * @return {boolean} If node selectable.
     */
    TreeNode.prototype.selectable = function() {
        var allow = tree.config.allowSelection(this);
        return typeof allow === 'boolean' ? allow : this.itree.state.selectable;
    };

    /**
     * Get if node selected.
     *
     * @category TreeNode
     * @return {boolean} If selected.
     */
    TreeNode.prototype.selected = function() {
        return this.itree.state.selected;
    };

    /**
     * Set a root property on this node.
     *
     * @category TreeNode
     * @param {string|number} property Property name.
     * @param {*} value New value.
     * @return {TreeNode} Node object.
     */
    TreeNode.prototype.set = function(property, value) {
        this[property] = value;
        this.markDirty();

        return this;
    };

    /**
     * Show this node.
     *
     * @category TreeNode
     * @param {boolean} selectable Selectable state.
     * @return {TreeNode} Node object.
     */
    TreeNode.prototype.setSelectable = function(selectable) {
        return baseStateChange('selectable', selectable, 'selectability-changed', this);
    };

    /**
     * Show this node.
     *
     * @category TreeNode
     * @return {TreeNode} Node object.
     */
    TreeNode.prototype.show = function() {
        return baseStateChange('hidden', false, 'shown', this);
    };

    /**
     * Mark this node as "removed" without actually removing it.
     *
     * Expand/show methods will never reveal this node until restored.
     *
     * @category TreeNode
     * @return {TreeNode} Node object.
     */
    TreeNode.prototype.softRemove = function() {
        return baseStateChange('removed', true, 'softremoved', this, 'softRemove');
    };

    /**
     * Toggles collapsed state.
     *
     * @category TreeNode
     * @return {TreeNode} Node object.
     */
    TreeNode.prototype.toggleCollapse = function() {
        return (this.collapsed() ? this.expand() : this.collapse());
    };

    /**
     * Toggles selected state.
     *
     * @category TreeNode
     * @return {TreeNode} Node object.
     */
    TreeNode.prototype.toggleSelect = function() {
        return (this.selected() ? this.deselect() : this.select());
    };

    /**
     * Export this node as a native Object.
     *
     * @category TreeNode
     * @return {object} Node object.
     */
    TreeNode.prototype.toObject = function() {
        var object = {};

        _.each(this, function(value, property) {
            object[property] = value;
        });

        if (this.hasChildren() && _.isFunction(this.children.toArray)) {
            object.children = this.children.toArray();
        }

        return object;
    };

    /**
     * Checks whether a node is visible to a user. Returns false
     * if it's hidden, or if any ancestor is hidden or collapsed.
     *
     * @category TreeNode
     * @param {object} node Node object.
     * @return {boolean} Whether visible.
     */
    TreeNode.prototype.visible = function() {
        var node = this;

        var isVisible = true;
        if (node.hidden() || node.removed()) {
            isVisible = false;
        }
        else if (node.hasParent()) {
            if (node.getParent().collapsed()) {
                isVisible = false;
            }
            else {
                isVisible = node.getParent().visible();
            }
        }
        else {
            isVisible = true;
        }

        return isVisible;
    };

    /**
     * An Array-like collection of TreeNodes.
     *
     * @category TreeNodes
     * @param {array} array Array of TreeNode objects.
     * @return {TreeNodes} Collection of TreeNode
     */
    function TreeNodes(array) {
        var treeNodes = this;

        if (_.isArray(array)) {
            _.each(array, function(node) {
                treeNodes.push(node);
            });
        }
    };
    TreeNodes.prototype = Object.create(Array.prototype);
    TreeNodes.prototype.constructor = TreeNodes;

    /**
     * Clones (deep) the array of nodes.
     *
     * @category TreeNodes
     * @return {TreeNodes} Array of cloned nodes.
     */
    TreeNodes.prototype.clone = function() {
        var newArray = new TreeNodes();

        _.each(this, function(node) {
            newArray.push(node.clone());
        });

        return newArray;
    };

    /**
     * Copies nodes to a new tree instance.
     *
     * @category TreeNodes
     * @param {boolean} hierarchy Include necessary ancestors to match hierarchy.
     * @return {void}
     */
    TreeNodes.prototype.copy = function(hierarchy) {
        var nodes = this;

        return {

            /**
             * Sets a destination.
             *
             * @category CopyNode
             * @param {object} dest Destination Inspire Tree.
             * @return {array} Array of new nodes.
             */
            to: function(dest) {
                if (!_.isFunction(dest.addNodes)) {
                    throw new Error('Destination must be an Inspire Tree instance.');
                }

                var newNodes = new TreeNodes();

                _.each(nodes, function(node) {
                    newNodes.push(node.copy(hierarchy).to(dest));
                });

                return newNodes;
            }
        };
    };

    /**
     * Concat nodes like an Array would.
     *
     * @category TreeNodes
     * @param {TreeNodes} nodes Array of nodes.
     * @return {TreeNodes} Resulting node array.
     */
    TreeNodes.prototype.concat = function(nodes) {
        var newNodes = new TreeNodes();

        var pusher = function(node) {
            newNodes.push(node);
        };

        _.each(this, pusher);
        _.each(nodes, pusher);

        return newNodes;
    };

    /**
     * Returns deepest nodes from this array.
     *
     * @return {TreeNodes} Array of node objects.
     */
    TreeNodes.prototype.deepest = function() {
        var matches = new TreeNodes();

        this.recurseDown(function(node) {
            if (!node.children) {
                matches.push(node);
            }
        });

        return matches;
    };

    /**
     * Recursively expands all nodes, loading all dynamic calls.
     *
     * @category TreeNodes
     * @return {Promise} Promise resolved only when all children have loaded and expanded.
     */
    TreeNodes.prototype.expandDeep = function() {
        var nodes = this;

        return new Promise(function(resolve) {
            var waitCount = 0;

            var done = function() {
                if (--waitCount === 0) {
                    resolve(nodes);
                }
            };

            nodes.recurseDown(function(node) {
                waitCount++;

                // Ignore nodes without children
                if (node.children) {
                    node.expand().catch(done).then(function() {
                        // Manually trigger expansion on newly loaded children
                        node.children.expandDeep().catch(done).then(done);
                    });
                }
                else {
                    done();
                }
            });
        });
    };

    /**
     * Clones an array of node objects and removes any
     * itree instance information/state.
     *
     * @category TreeNodes
     * @return {array} Array of node objects.
     */
    TreeNodes.prototype.export = function() {
        var clones = [];

        _.each(this, function(node) {
            clones.push(node.export());
        });

        return clones;
    };

    /**
     * Returns a cloned hierarchy of all nodes matching a predicate.
     *
     * Because it filters deeply, we must clone all nodes so that we
     * don't affect the actual node array.
     *
     * @category TreeNodes
     * @param {string|function} predicate State flag or custom function.
     * @return {TreeNodes} Array of node objects.
     */
    TreeNodes.prototype.extract = function(predicate) {
        var flat = this.flatten(predicate);
        var matches = new TreeNodes();

        _.each(flat, function(node) {
            matches.push(node.copyHierarchy());
        });

        return matches;
    };

    /**
     * Returns nodes which match a predicate.
     *
     * @category TreeNodes
     * @param {string|function} predicate State flag or custom function.
     * @return {TreeNodes} Array of node objects.
     */
    TreeNodes.prototype.filter = function(predicate) {
        var fn = getPredicateFunction(predicate);
        var matches = new TreeNodes();

        _.each(this, function(node) {
            if (fn(node)) {
                matches.push(node);
            }
        });

        return matches;
    };

    /**
     * Flattens a hierarchy, returning only node(s) matching the
     * expected state or predicate function.
     *
     * @category TreeNodes
     * @param {string|function} predicate State property or custom function.
     * @return {TreeNodes} Flat array of matching nodes.
     */
    TreeNodes.prototype.flatten = function(predicate) {
        var flat = new TreeNodes();

        var fn = getPredicateFunction(predicate);
        this.recurseDown(function(node) {
            if (fn(node)) {
                flat.push(node);
            }
        });

        return flat;
    };

    /**
     * Get a specific node in the collection, or undefined if it doesn't exist.
     *
     * @category TreeNodes
     * @param {int} index Numeric index of requested node.
     * @return {TreeNode} Node object. Undefined if invalid index.
     */
    TreeNodes.prototype.get = function(index) {
        return this[index];
    };

    /**
     * Iterate down all nodes and any children.
     *
     * @category TreeNodes
     * @param {function} iteratee Iteratee function.
     * @return {TreeNodes} Resulting nodes.
     */
    TreeNodes.prototype.recurseDown = function(iteratee) {
        recurseDown(this, iteratee);

        return this;
    };

    /**
     * Sorts all TreeNode objects in this collection.
     *
     * If no custom sorter given, the configured "sort" value will be used.
     *
     * @category TreeNodes
     * @param {string|function} sorter Sort function or property name.
     * @return {TreeNodes} Array of node obejcts.
     */
    TreeNodes.prototype.sort = function(sorter) {
        var nodes = this;

        if (tree.config.sort && !sorter) {
            sorter = tree.config.sort;
        }

        var sorted = _.sortBy(nodes, sorter);

        nodes.length = 0;
        _.each(sorted, function(node) {
            nodes.push(node);
        });

        return nodes;
    };

    /**
     * Returns a native Array of nodes.
     *
     * @category TreeNodes
     * @return {array} Array of node objects.
     */
    TreeNodes.prototype.toArray = function() {
        var array = [];

        _.each(this, function(node) {
            array.push(node.toObject());
        });

        return array;
    };

    /**
     * Map shallow to each TreeNode
     *
     * @private
     * @param {string} method Method name.
     * @return {void}
     */
    function mapToEach(method) {
        TreeNodes.prototype[method] = function() {
            dom.batch();
            _.each(this, function(node) {
                node[method]();
            });
            dom.end();

            return this;
        };
    }

    /**
     * Map deeply to all TreeNodes and children
     *
     * @private
     * @param {string} method Method name.
     * @return {void}
     */
    function mapToEachDeeply(method) {
        TreeNodes.prototype[method + 'Deep'] = function() {
            dom.batch();
            this.recurseDown(function(node) {
                node[method]();
            });
            dom.end();

            return this;
        };
    }

    // Methods we can map to each/deeply TreeNode
    var mapped = ['blur', 'collapse', 'deselect', 'hide', 'restore', 'select', 'setSelectable', 'show'];
    _.each(mapped, function(method) {
        mapToEach(method);
        mapToEachDeeply(method);
    });

    // Methods we can map to each TreeNode
    _.each(['expand', 'expandParents', 'clean', 'softRemove'], mapToEach);

    // Predicate methods we can map
    _.each(['available', 'collapsed', 'focused', 'hidden', 'removed', 'selected'], function(state) {
        TreeNodes.prototype[state] = function(full) {
            if (full) {
                return this.extract(state);
            }

            return this.flatten(state);
        };
    });

    /**
     * Stores repetitive state change logic for most state methods.
     *
     * @private
     * @param {string} prop State property name.
     * @param {boolean} value New state value.
     * @param {string} verb Verb used for events.
     * @param {TreeNode} node Node object.
     * @param {string} deep Optional name of state method to call recursively.
     * @return {TreeNode} Node object.
     */
    function baseStateChange(prop, value, verb, node, deep) {
        if (node.itree.state[prop] !== value) {
            if (prop === 'removed') {
                resetState(node);
            }

            node.itree.state[prop] = value;

            tree.emit('node.' + verb, node);

            if (deep && node.hasChildren()) {
                node.getChildren().recurseDown(function(child) {
                    child[deep]();
                });
            }

            node.markDirty();
            dom.applyChanges();
        }

        return node;
    }

    /**
     * Parses a raw collection of objects into a model used
     * within a tree. Adds state and other internal properties.
     *
     * @private
     * @param {array|object} array Array of nodes
     * @param {object} parent Pointer to parent object
     * @return {array|object} Object model.
     */
    function collectionToModel(array, parent) {
        var collection = new TreeNodes();

        // Sort
        if (tree.config.sort) {
            array = _.sortBy(array, tree.config.sort);
        }

        _.each(array, function(node) {
            collection.push(objectToModel(node, parent));
        });

        return collection;
    };

    /**
     * Creates a predicate function.
     *
     * @private
     * @param {string|function} predicate Property name or custom function.
     * @return {function} Predicate function.
     */
    function getPredicateFunction(predicate) {
        var fn = predicate;
        if (typeof predicate === 'string') {
            fn = function(node) {
                return _.isFunction(node[predicate]) ? node[predicate]() : node[predicate];
            };
        }

        return fn;
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
        var newNodes = new TreeNodes();

        if (node.id) {
            // Does node already exist
            var existing = tree.node(node.id);
            if (existing) {
                existing.restore();
                existing.show();

                // Merge children
                if (node.hasChildren()) {
                    if (!_.isArrayLike(existing.children)) {
                        existing.children = new TreeNodes();
                    }

                    _.each(node.children, function(child) {
                        newNodes.concat(mergeNode(existing, child));
                    });
                }

                // Merge truthy
                else if (node.children) {
                    existing.children = node.children;
                }
            }
            else {
                if (context instanceof TreeNode) {
                    node.itree.parent = context;
                    context.children.push(node);
                }
                else {
                    context.push(node);
                }

                node.markDirty();
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

        // Enabled by default
        state.collapsed = typeof state.collapsed === 'boolean' ? state.collapsed : defaultState.collapsed;
        state.selectable = typeof state.selectable === 'boolean' ? state.selectable : defaultState.selectable;

        // Disabled by default
        state.focused = state.focused || defaultState.focused;
        state.hidden = state.hidden || defaultState.hidden;
        state.indeterminate = state.indeterminate || defaultState.indeterminate;
        state.loading = state.loading || defaultState.loading;
        state.removed = state.removed || defaultState.removed;
        state.selected = state.selected || defaultState.selected;

        // Save parent, if any.
        object.itree.parent = parent;

        // Wrap
        object = _.assign(new TreeNode(), object);

        if (object.hasChildren()) {
            object.children = collectionToModel(object.children, object);
        }

        // Fire events for pre-set states, if enabled
        if (allowsLoadEvents) {
            _.each(tree.config.allowLoadEvents, function(eventName) {
                if (state[eventName]) {
                    tree.emit('node.' + eventName, object);
                }
            });
        }

        return object;
    };

    /**
     * Base recursion function for a collection or node.
     *
     * Returns false if execution should cease.
     *
     * @private
     * @param {TreeNode|TreeNodes} obj Node or collection.
     * @param {function} iteratee Iteratee function
     * @return {boolean} Cease iteration.
     */
    function recurseDown(obj, iteratee) {
        var res;

        if (_.isArrayLike(obj)) {
            _.each(obj, function(node) {
                res = recurseDown(node, iteratee);

                return res;
            });
        }
        else {
            res = iteratee(obj);

            // Recurse children
            if (res !== false && obj.hasChildren()) {
                res = recurseDown(obj.children, iteratee);
            }
        }

        return res;
    }

    /**
     * Reset a node's state to the tree default.
     *
     * @private
     * @param {TreeNode} node Node object.
     * @returns {TreeNode} Node object.
     */
    function resetState(node) {
        _.each(defaultState, function(val, prop) {
            node.itree.state[prop] = val;
        });

        return node;
    }

    var model = new TreeNodes();

    // Map some model.TreeNodes method to the tree to make life easier for users
    for (var method in TreeNodes.prototype) {
        if (method !== 'constructor' && !tree[method] && _.isFunction(TreeNodes.prototype[method])) {
            (function(methodName) {
                tree[methodName] = function() {
                    return model[methodName].apply(model, arguments);
                };
            }(method));
        }
    }

    /**
     * Add a node.
     *
     * @category Tree
     * @param {object} node Node object.
     * @return {object} Node object.
     */
    tree.addNode = function(node) {
        node = objectToModel(node);
        var newNodes = mergeNode(model, node);

        if (newNodes.length) {
            tree.emit('node.added', node);
            node.markDirty();
            dom.applyChanges();
        }

        return node;
    };

    /**
     * Add nodes.
     *
     * @category Tree
     * @param {array} nodes Array of node objects.
     * @return {TreeNodes} Added node objects.
     */
    tree.addNodes = function(nodes) {
        dom.batch();

        var newNodes = new TreeNodes();
        _.each(nodes, function(node) {
            newNodes.push(tree.addNode(node));
        });

        dom.end();

        return newNodes;
    };

    /**
     * Shows all nodes and collapses parents.
     *
     * @category Tree
     * @return {void}
     */
    tree.clearSearch = function() {
        tree.nodes().showDeep();
        tree.nodes().collapseDeep();
    };

    /**
     * Get a node.
     *
     * @category Tree
     * @param {string|number} id ID of node.
     * @param {TreeNodes} nodes Base collection to search in.
     * @return {TreeNode} Node object.
     */
    tree.node = function(id, nodes) {
        var match;

        if (_.isNumber(id)) {
            id = id.toString();
        }

        (nodes || model).recurseDown(function(node) {
            if (node.id === id) {
                match = node;

                return false;
            }
        });

        return match;
    };

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
    tree.nodes = function(refs) {
        var nodes = model;

        if (_.isArray(refs)) {
            nodes = new TreeNodes();

            _.each(refs, function(ref) {
                var node = tree.node(ref);
                if (node) {
                    nodes.push(node);
                }
            });
        }

        return nodes;
    };

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
    tree.load = function(loader) {
        return new Promise(function(resolve, reject) {
            var complete = function(nodes) {
                // Delay event for synchronous loader. Otherwise it fires
                // before the user has a chance to listen.
                if (!initialized && _.isArray(nodes)) {
                    setTimeout(function() {
                        tree.emit('data.loaded', nodes);
                    });
                }
                else {
                    tree.emit('data.loaded', nodes);
                }

                // Clear and call rendering on existing data
                if (model.length > 0) {
                    tree.removeAll();
                }

                model = collectionToModel(nodes);

                if (tree.config.requireSelection && !tree.selected().length) {
                    tree.selectFirstAvailableNode();
                }

                // Delay event for synchronous loader
                if (!initialized && _.isArray(nodes)) {
                    setTimeout(function() {
                        tree.emit('model.loaded', model);
                    });
                }
                else {
                    tree.emit('model.loaded', model);
                }

                resolve(model);

                dom.applyChanges();

                if (_.isFunction(dom.scrollSelectedIntoView)) {
                    dom.scrollSelectedIntoView();
                }
            };

            var error = function(err) {
                tree.emit('data.loaderror', err);
                reject(err);
            };

            // Data given already as an array
            if (_.isArrayLike(loader)) {
                complete(loader);
            }

            // Data loader requires a caller/callback
            else if (_.isFunction(loader)) {
                loader(null, complete, error);
            }

            // Data loader is likely a promise
            else if (_.isObject(loader)) {
                // Promise
                if (_.isFunction(loader.then)) {
                    loader.then(complete);
                }

                // jQuery promises use "error".
                if (_.isFunction(loader.error)) {
                    loader.error(error);
                }
                else if (_.isFunction(loader.catch)) {
                    loader.catch(error);
                }
            }

            else {
                throw new Error('Invalid data loader.');
            }
        });
    };

    /**
     * Reloads/re-executes the original data loader.
     *
     * @category Tree
     * @return {void}
     */
    tree.reload = function() {
        tree.load(tree.config.data);
    };

    /**
     * Removes all nodes.
     *
     * @category Tree
     * @return {void}
     */
    tree.removeAll = function() {
        model = new TreeNodes();
        dom.applyChanges();
    };

    /**
     * Search nodes, showing only those that match and the necessary hierarchy.
     *
     * @category Tree
     * @param {*} query Search string, RegExp, or function.
     * @return {TreeNodes} Array of matching node objects.
     */
    tree.search = function(query) {
        var matches = new TreeNodes();

        var custom = tree.config.search;
        if (_.isFunction(custom)) {
            return custom(
                query,
                function resolver(nodes) {
                    dom.batch();

                    tree.nodes().hideDeep();
                    _.each(nodes, function(node) {
                        mergeNode(model, node);
                    });

                    dom.end();
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

        dom.batch();

        model.recurseDown(function(node) {
            var match = predicate(node);
            var wasHidden = node.hidden();
            node.itree.state.hidden = !match;

            // If hidden state will change
            if (wasHidden !== node.hidden()) {
                node.markDirty();
            }

            if (match) {
                matches.push(node);
                node.expandParents();
            }
        });

        dom.end();

        return matches;
    };

    /**
     * Select all nodes between a start and end node.
     * Starting node must have a higher index path so we can work down to endNode.
     *
     * @category Tree
     * @param {TreeNode} startNode Starting node
     * @param {TreeNode} endNode Ending node
     * @return {void}
     */
    tree.selectBetween = function(startNode, endNode) {
        dom.batch();

        var node = startNode.nextVisibleNode();
        while (node) {
            node.select();

            if (node && node.id === endNode.id) {
                break;
            }

            node = node.nextVisibleNode();
        }

        dom.end();
    };

    /**
     * Select the first available node at the root level.
     *
     * @category Tree
     * @return {TreeNode} Selected node object.
     */
    tree.selectFirstAvailableNode = function() {
        var node = model.filter('available').get(0);
        if (node) {
            node.select();
        }

        return node;
    };

    // Connect to our target DOM element
    dom.attach(tree.config.target);

    // Load initial user data
    tree.load(tree.config.data);

    initialized = true;

    return tree;
};

// Mixin EventEmitter
InspireTree.prototype = Object.create(EventEmitter.prototype);

module.exports = InspireTree;
