'use strict';

// Libs
var assign = require('lodash.assign');
var cloneDeep = require('lodash.clonedeep');
var cuid = require('cuid');
var defaultsDeep = require('lodash.defaultsdeep');
var each = require('lodash.foreach');
var EventEmitter = require('eventemitter2');
var find = require('lodash.find');
var findIndex = require('lodash.findindex');
var findLast = require('lodash.findlast');
var isArray = require('lodash.isarray');
var isArrayLike = require('./lib/isArrayLike');
var isEmpty = require('lodash.isempty');
var isFunction = require('lodash.isfunction');
var isObject = require('lodash.isobject');
var isRegExp = require('lodash.isregexp');
var isString = require('lodash.isstring');
var map = require('lodash.map');
var remove = require('lodash.remove');
var slice = require('lodash.slice');
var sortBy = require('lodash.sortby');

// CSS
require('./scss/tree.scss');

function InspireTree(opts) {
    var noop = function() {};
    var tree = this;
    tree.preventDeselection = false;

    // Assign defaults
    tree.config = defaultsDeep(opts, {
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
    var allowsLoadEvents = isArray(tree.config.allowLoadEvents) && tree.config.allowLoadEvents.length > 0;
    var isDynamic = isFunction(tree.config.data);

    // Rendering
    var dom;

    // Webpack has a DOM boolean that when false,
    // allows us to exclude this library from our build.
    // For those doing their own rendering, it's useless.
    if (DOM) {
        dom = new (require('./dom'))(tree);
    }

    // Validation
    if (dom && (!isObject(opts) || !opts.target)) {
        throw new TypeError('Property "target" is required, either an element or a selector.');
    }

    // Load custom/empty renderer
    if (!dom) {
        dom = isFunction(tree.config.renderer) ? tree.config.renderer(tree) : {
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

        each(source, function(value, key) {
            if (isObject(value) && isFunction(value.clone)) {
                if (value.clone) {
                    node[key] = value.clone();
                }
            }
            else if (isObject(value)) {
                node[key] = cloneDeep(value);
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

        if (!isArrayLike(this.children)) {
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
     * @return {void}
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
                if (!isFunction(dest.addNode)) {
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
        var parents = node.getParents().clone();

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
            var children = new TreeNodes();

            if (key + 1 < l) {
                children.push(parents[key + 1]);
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
        if (!tree.config.requireSelection || tree.getSelectedNodes().length > 1) {
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
     * @return {TreeNode} Node object.
     */
    TreeNode.prototype.expand = function() {
        var node = this;
        var allow = (node.hasChildren() || (isDynamic && node.children === true));

        if (allow && (node.collapsed() || node.hidden())) {
            node.itree.state.collapsed = false;
            node.itree.state.hidden = false;

            tree.emit('node.expanded', node);

            if (isDynamic && node.children === true) {
                node.loadChildren();
            }
            else {
                node.markDirty();
                dom.applyChanges();
            }
        }

        return node;
    };

    /**
     * Expand parent nodes.
     *
     * @category TreeNode
     * @return {void}
     */
    TreeNode.prototype.expandParents = function() {
        if (this.hasParent()) {
            this.getParent().recurseUp(function(node) {
                node.expand();
            });
        }
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
     * @category TreeNode
     * @return {object} Cloned/modified node object.
     */
    TreeNode.prototype.export = function() {
        var nodeClone = this.clone();
        delete nodeClone.itree;

        if (nodeClone.hasChildren()) {
            nodeClone.children = nodeClone.children.export();
        }

        return nodeClone.toObject();
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
            tree.getNodes().blurDeep();
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

        var parent = this.getParent();
        if (parent) {
            parents.push(parent);
            parents = parents.concat(parent.getParents());
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
        var node = this;
        var paths = [];

        var parents = node.getParents().reverse();
        each(parents, function(parent) {
            paths.push(parent.text);
        });

        paths.push(node.text);

        return paths;
    };

    /**
     * If node has any children.
     *
     * @category TreeNode
     * @return {boolean} If children.
     */
    TreeNode.prototype.hasChildren = function() {
        return (isArrayLike(this.children) && this.children.length > 0);
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
            each(this.children, function(child) {
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
     * @return {void}
     */
    TreeNode.prototype.loadChildren = function() {
        var node = this;

        if (isDynamic && node.children === true) {
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

                    tree.emit('children.loaded', node);
                },
                function rejecter(err) {
                    tree.emit('tree.loaderror', err);

                    node.itree.state.loading = false;
                    node.children = new TreeNodes();
                    node.markDirty();
                    dom.applyChanges();
                }
            );
        }
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
            next = find(startingNode.children, function(child) {
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
        if (!next && startingNode.hasParent()) {
            next = startingNode.getParent().nextVisibleSiblingNode();
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
        var context = (startingNode.hasParent() ? startingNode.getParent().children : tree.getNodes());
        var i = findIndex(context, { id: startingNode.id });

        return find(slice(context, i + 1), function(node) {
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
            prev = findLast(prev.children, function(node) {
                return node.visible();
            });
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
        var context = (this.hasParent() ? this.getParent().children : tree.getNodes());
        var i = findIndex(context, { id: this.id });
        return findLast(slice(context, 0, i), function(node) {
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
        var node = this;
        var result = iteratee(node);

        if (result) {
            node = result;
        }

        if (node.hasParent()) {
            node.getParent().recurseUp(iteratee);
        }

        return node;
    };

    /**
     * Iterate down node and any children.
     *
     * @category TreeNode
     * @param {function} iteratee Iteratee function.
     * @return {TreeNode} Resulting node.
     */
    TreeNode.prototype.recurseDown = function(iteratee) {
        return tree.recurseDown(this, iteratee);
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

                each(node.children, function(child) {
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
        remove(context, { id: node.id });

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
                tree.getNodes().deselectDeep();
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
     * Select this node.
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
        var node = this;

        // Reset all state properties
        each(defaultState, function(val, prop) {
            node.itree.state[prop] = val;
        });

        return baseStateChange('removed', true, 'softremoved', node);
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

        each(this, function(value, property) {
            object[property] = value;
        });

        if (this.hasChildren() && isFunction(this.children.toArray)) {
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

        if (isArray(array)) {
            each(array, function(node) {
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

        each(this, function(node) {
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
                if (!isFunction(dest.addNodes)) {
                    throw new Error('Destination must be an Inspire Tree instance.');
                }

                var newNodes = new TreeNodes();

                each((nodes || model), function(node) {
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

        each(this, pusher);
        each(nodes, pusher);

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
            if (!node.hasChildren()) {
                matches.push(node);
            }
        });

        return matches;
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

        each(this, function(node) {
            clones.push(node.export());
        });

        return clones;
    };

    /**
     * Returns a new array of nodes which match a predicate.
     *
     * @category TreeNodes
     * @param {string|function} predicate State flag or custom function.
     * @return {TreeNodes} Array of node objects.
     */
    TreeNodes.prototype.filter = function(predicate) {
        var flat = this.flatten(predicate);
        var matches = [];

        each(flat, function(node) {
            matches.push(node.copyHierarchy());
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

        var fn = predicate;
        if (typeof predicate === 'string') {
            fn = function(node) {
                return node[predicate]();
            };
        }

        this.recurseDown(function(node) {
            if (fn(node)) {
                flat.push(node);
            }
        });

        return flat;
    };

    /**
     * Iterate down all nodes and any children.
     *
     * @category TreeNodes
     * @param {function} iteratee Iteratee function.
     * @return {TreeNodes} Resulting nodes.
     */
    TreeNodes.prototype.recurseDown = function(iteratee) {
        return tree.recurseDown(this, iteratee);
    };

    /**
     * Get a subset of nodes based on how they match the predicate function.
     *
     * @category TreeNodes
     * @param {function} predicate Predicate function.
     * @return {TreeNodes} Array of matching node objects.
     */
    TreeNodes.prototype.reduce = function(predicate) {
        var reduced = new TreeNodes();

        each(this, function(node) {
            if (predicate(node)) {
                reduced.push(node);
            }
        });

        return reduced;
    };

    /**
     * Get a subset of all descendant nodes based on how they match the predicate function.
     *
     * @category TreeNodes
     * @param {function} predicate Predicate function.
     * @return {TreeNodes} Array of matching node objects.
     */
    TreeNodes.prototype.reduceDeep = function(predicate) {
        var reduced = new TreeNodes();

        this.recurseDown(function(node) {
            if (predicate(node)) {
                reduced.push(node);
            }
        });

        return reduced;
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

        var sorted = sortBy(nodes, sorter);

        nodes.length = 0;
        each(sorted, function(node) {
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

        each(this, function(node) {
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
            each(this, function(node) {
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
            tree.recurseDown(this, function(node) {
                node[method]();
            });

            if (method === 'hide' || method === 'softRemove') {
                this.clean();
            }

            dom.end();

            return this;
        };
    }

    // Methods we can map to each/deeply TreeNode
    var mapped = ['blur', 'collapse', 'deselect', 'expand', 'hide', 'restore', 'select', 'show', 'softRemove'];
    each(mapped, function(method) {
        mapToEach(method);
        mapToEachDeeply(method);
    });

    // Methods we can map to each TreeNode
    each(['expandParents', 'clean'], mapToEach);

    // Filter methods we can map
    each(['available', 'collapsed', 'hidden', 'removed', 'selected'], function(state) {
        TreeNodes.prototype['get' + capitalize(state) + 'Nodes'] = function(full) {
            if (full) {
                return this.filter(state);
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
     * @return {TreeNode} Node object.
     */
    function baseStateChange(prop, value, verb, node) {
        if (node.itree.state[prop] !== value) {
            node.itree.state[prop] = value;

            tree.emit('node.' + verb, node);

            node.markDirty();
            dom.applyChanges();
        }

        return node;
    }

    /**
     * Capitalize the first letting in a string.
     *
     * @private
     * @param {string} string Source string.
     * @return {string} Resulting string.
     */
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
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
            array = sortBy(array, tree.config.sort);
        }

        each(array, function(node) {
            collection.push(objectToModel(node, parent));
        });

        return collection;
    };

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
            var existing = tree.getNode(node.id);
            if (existing) {
                existing.restore();
                existing.show();

                // Merge children
                if (node.hasChildren()) {
                    if (!isArrayLike(existing.children)) {
                        existing.children = new TreeNodes();
                    }

                    each(node.children, function(child) {
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
        object = assign(new TreeNode(), object);

        if (object.hasChildren()) {
            object.children = collectionToModel(object.children, object);
        }

        // Fire events for pre-set states, if enabled
        if (allowsLoadEvents) {
            each(tree.config.allowLoadEvents, function(eventName) {
                if (state[eventName]) {
                    tree.emit('node.' + eventName, object);
                }
            });
        }

        return object;
    };

    var model = new TreeNodes();

    // Map some model.TreeNodes method to the tree to make life easier for users
    for (var method in TreeNodes.prototype) {
        if (method !== 'constructor' && !tree[method] && isFunction(TreeNodes.prototype[method])) {
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
        }

        node.markDirty();
        dom.applyChanges();

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
        each(nodes, function(node) {
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
        tree.getNodes().showDeep();
        tree.getNodes().collapseDeep();
    };

    /**
     * Get a node.
     *
     * @category Tree
     * @param {string|number} id ID of node.
     * @param {TreeNodes} nodes Base collection to search in.
     * @return {TreeNode} Node object.
     */
    tree.getNode = function(id, nodes) {
        var node;

        if (!isString(id)) {
            id = id.toString();
        }

        each((nodes || model), function(item) {
            if (item.id === id) {
                node = item;
            }

            if (!node && item.hasChildren()) {
                node = tree.getNode(id, item.children);
            }

            if (node) {
                return false;
            }
        });

        return node;
    };

    /**
     * Get all nodes in a tree, or nodes for an array of IDs.
     *
     * @category Tree
     * @param {array} refs Array of ID references.
     * @return {TreeNodes} Array of node objects.
     * @example
     *
     * var all = tree.getNodes()
     * var some = tree.getNodes([1, 2, 3])
     */
    tree.getNodes = function(refs) {
        var nodes = model;

        if (isArray(refs)) {
            var found = new TreeNodes();

            each(refs, function(ref) {
                var node = tree.getNode(ref);
                if (node) {
                    found.push(node);
                }
            });

            nodes = found;
        }

        return nodes;
    };

    /**
     * Get the currently focused node, if any.
     *
     * @category Tree
     * @return {TreeNode} Node object.
     */
    tree.getFocusedNode = function() {
        var node;

        var focused = model.flatten('focused');
        if (!isEmpty(focused)) {
            node = focused[0];
        }

        return node;
    };

    /**
     * Loads tree. Accepts an array or a promise.
     *
     * @category Tree
     * @param {array|function} loader Array of nodes, or promise resolving an array of nodes.
     * @return {void}
     * @example
     *
     * tree.load($.getJSON('nodes.json'));
     */
    tree.load = function(loader) {
        var resolve = function(nodes) {
            // Emit raw data
            tree.emit('data.loaded', nodes);

            // Clear and call rendering on existing data
            if (model.length > 0) {
                tree.removeAll();
            }

            model = collectionToModel(nodes);

            if (tree.config.requireSelection && !tree.getSelectedNodes().length) {
                tree.selectFirstVisibleNode();
            }

            tree.emit('model.loaded', model);

            dom.applyChanges();

            if (isFunction(dom.scrollSelectedIntoView)) {
                dom.scrollSelectedIntoView();
            }
        };

        var reject = function(err) {
            tree.emit('data.loaderror', err);
            throw err;
        };

        // Data given already as an array
        if (isArrayLike(loader)) {
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
     * Iterate down node/children recursively.
     *
     * @category Tree
     * @param {TreeNodes|TreeNode} collection Array of nodes or node object.
     * @param {function} iteratee Iteratee function.
     * @return {TreeNodes} Resulting node array.
     */
    tree.recurseDown = function(collection, iteratee) {
        // Recurse each element in this array
        if (isArrayLike(collection)) {
            each(collection, function(element, i) {
                var res = tree.recurseDown(element, iteratee);

                if (res) {
                    collection[i] = res;
                }
            });
        }

        else if (isObject(collection)) {
            var result = iteratee(collection);

            if (result) {
                collection = result;
            }

            // Recurse children
            if (isArrayLike(collection.children) && !isEmpty(collection.children)) {
                collection.children = tree.recurseDown(collection.children, iteratee);
            }
        }

        return collection;
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
        if (isFunction(custom)) {
            return custom(
                query,
                function resolver(nodes) {
                    dom.batch();

                    tree.getNodes().hideDeep();
                    each(nodes, function(node) {
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
        if (isString(query) && isEmpty(query)) {
            return tree.clearSearch();
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

        dom.batch();

        tree.recurseDown(model, function(node) {
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
     * Select the first visible node at the root level.
     *
     * @category Tree
     * @return {TreeNode} Selected node object.
     */
    tree.selectFirstVisibleNode = function() {
        var select;

        each(model, function(node) {
            if (!node.hidden()) {
                node.select();

                select = node;
                return false;
            }
        });

        return select;
    };

    // Connect to our target DOM element
    dom.attach(tree.config.target);

    // Load initial user data
    tree.load(tree.config.data);

    return tree;
};

// Mixin EventEmitter
InspireTree.prototype = Object.create(EventEmitter.prototype);

module.exports = InspireTree;
