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
var get = require('lodash.get');
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
require('./tree.scss');

function InspireTree(opts) {
    if (!get(opts, 'target')) {
        throw new TypeError('Property "target" is required, either an element or a selector.');
    }

    // Assign defaults
    opts = defaultsDeep(opts, {
        contextMenu: false,
        dynamic: false,
        sort: false
    });

    // Cache some configs
    var isDynamic = opts.dynamic;

    var tree = this;
    tree.config = opts;

    // Rendering
    var dom = new (require('./lib/dom'))(tree);

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
        var node = this;
        if (!node.collapsed()) {
            node.itree.state.collapsed = true;

            tree.emit('node.collapsed', node);

            node.markDirty();
            dom.applyChanges();
        }

        return node;
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
     * @category TreeNode
     * @return {TreeNode} Node object.
     */
    TreeNode.prototype.deselect = function() {
        var node = this;

        if (node.selected()) {
            node.itree.state.selected = false;

            tree.emit('node.deselected', node);

            node.markDirty();
            dom.applyChanges();
        }

        return node;
    };

    /**
     * Expand this node.
     *
     * @category TreeNode
     * @return {TreeNode} Node object.
     */
    TreeNode.prototype.expand = function() {
        var node = this;
        var allow = (!isEmpty(get(node, 'children')) || isDynamic);

        if (allow && (node.collapsed() || node.hidden())) {
            node.itree.state.collapsed = false;
            node.itree.state.hidden = false;

            tree.emit('node.expanded', node);

            if (isDynamic && !node.hasChildren()) {
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
                return node.expand();
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
        return !this.itree.state.collapsed;
    };

    /**
     * Clones a node object and removes any
     * itree instance information/state.
     *
     * @category TreeNode
     * @return {TreeNode} Cloned/modified node object.
     */
    TreeNode.prototype.export = function() {
        var nodeClone = this.clone();

        tree.recurseDown(nodeClone, function(node) {
            node.itree = null;
            return node;
        });

        return nodeClone;
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
        var node = this;

        if (!node.hidden()) {
            node.itree.state.hidden = true;

            tree.emit('node.hidden', node);

            // Update children
            if (node.hasChildren()) {
                node.children.hide();
            }

            node.markDirty();
            dom.applyChanges();
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

        if (isDynamic) {
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
     * @param {boolean} noRecursion Skip recursing up parent tree.
     * @return {TreeNode} Node object.
     */
    TreeNode.prototype.markDirty = function(noRecursion) {
        if (noRecursion) {
            this.itree.dirty = true;
        }
        else {
            this.recurseUp(function(node) {
                return node.markDirty(true);
            });
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
        node = iteratee(node);

        if (!node) {
            throw new TypeError('Invalid recurseUp return value. Did you forget "return"?');
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
     * Remove a node from the tree.
     *
     * @category TreeNode
     * @return {void}
     */
    TreeNode.prototype.remove = function() {
        var node = this;
        var context = (node.parent ? node.parent.children : model);
        remove(context, { id: node.id });

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
        var node = this;
        if (node.removed()) {
            node.itree.state.removed = false;

            tree.emit('node.restored', node);

            node.markDirty();
            dom.applyChanges();
        }

        return node;
    };

    /**
     * Select this node.
     *
     * @category TreeNode
     * @return {TreeNode} Node object.
     */
    TreeNode.prototype.select = function() {
        var node = this;

        if (!node.selected()) {
            // Batch selection changes
            dom.batch();
            tree.getNodes().deselectDeep();
            node.itree.state.selected = true;

            // Emit this event
            tree.emit('node.selected', node);

            // Mark hierarchy dirty and apply
            node.markDirty();
            dom.end();
        }

        return node;
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
        var node = this;
        if (node.hidden()) {
            node.itree.state.hidden = false;

            tree.emit('node.shown', node);

            node.markDirty();
            dom.applyChanges();
        }

        return node;
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
        if (!node.removed()) {
            node.itree.state.removed = true;

            tree.emit('node.softremoved', node);

            node.markDirty();
            dom.applyChanges();
        }

        return node;
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
     * Toggles collapsed state.
     *
     * @category TreeNode
     * @return {TreeNode} Node object.
     */
    TreeNode.prototype.toggleSelect = function() {
        return (this.selected() ? this.deselect() : this.select());
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
     * Clones an array of node objects and removes any
     * itree instance information/state.
     *
     * @category TreeNodes
     * @return {TreeNodes} Cloned/modified node objects.
     */
    TreeNodes.prototype.export = function() {
        var nodeClones = this.clone();

        tree.recurseDown(nodeClones, function(node) {
            node.itree = null;
            return node;
        });

        return nodeClones;
    };

    /**
     * Flattens a hierarchy, returning only node(s) with the
     * expected state, for operations which must exclude parents.
     *
     * @category TreeNodes
     * @param {string} flag Which state flag to filter by.
     * @return {TreeNodes} Flat array of matching nodes.
     */
    TreeNodes.prototype.flatten = function(flag) {
        var nodes = this;
        var flat = new TreeNodes();
        flag = flag || 'selected';

        if (isArrayLike(nodes) && !isEmpty(nodes)) {
            each(nodes, function(node) {
                if (node.itree.state[flag]) {
                    flat.push(node);
                }

                if (node.hasChildren()) {
                    flat = flat.concat(node.children.flatten(flag));
                }
            });
        }

        return flat;
    };

    /**
     * Returns a new TreeNodes array of available nodes.
     *
     * See README.md for terminology.
     *
     * @category TreeNodes
     * @return {TreeNodes} Array of node objects.
     */
    TreeNodes.prototype.getAvailableNodes = function() {
        return this.reduce(function(node) {
            return node.available();
        });
    };

    /**
     * Returns a new TreeNodes array of all available nodes
     * at the deepest level (having no children).
     *
     * See README.md for terminology.
     *
     * @category TreeNodes
     * @return {TreeNodes} Array of node objects.
     */
    TreeNodes.prototype.getDeepestAvailableNodes = function() {
        return this.reduceDeep(function(node) {
            return (!node.hasChildren() && node.available());
        });
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

            return node;
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
                return node;
            });
            dom.end();

            return this;
        };
    }

    // Methods can we map to each/deeply TreeNode
    var mapped = ['collapse', 'deselect', 'expand', 'hide', 'restore', 'show', 'softRemove'];
    each(mapped, function(method) {
        mapToEach(method);
        mapToEachDeeply(method);
    });

    // Methods can we map to each TreeNode
    each(['expandParents'], mapToEach);

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

                // Ensure existing accepts children
                if (!isArrayLike(existing.children)) {
                    existing.children = new TreeNodes();
                }

                each(node.children, function(child) {
                    newNodes.concat(mergeNode(existing, child));
                });
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
        state.collapsed = state.collapsed || true;
        state.hidden = state.hidden || false;
        state.loading = state.loading || false;
        state.removed = state.removed || false;
        state.selected = state.selected || false;

        // Save parent, if any.
        object.itree.parent = parent;

        // Wrap
        object = assign(new TreeNode(), object);

        if (isArrayLike(object.children) && object.children.length) {
            object.children = collectionToModel(object.children, object);
        }

        return object;
    };

    var data = this;
    var model = new TreeNodes();

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
     * Get all available nodes.
     *
     *  @category Tree
     * @return {TreeNodes} Array of node objects.
     */
    tree.getAvailableNodes = function() {
        return model.getAvailableNodes();
    };

    /**
     * Get all deepest available nodes.
     *
     * @category Tree
     * @return {TreeNodes} Array of node objects.
     */
    tree.getDeepestAvailableNodes = function() {
        return model.getDeepestAvailableNodes();
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

            if (!node && isArrayLike(item.children) && !isEmpty(item.children)) {
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
     * Returns a flat array of selected nodes.
     *
     * @category Tree
     * @param {TreeNodes} nodes Array of node objects to search within.
     * @return {TreeNodes} Selected nodes.
     */
    tree.getSelectedNodes = function(nodes) {
        return (nodes || model).flatten('selected');
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

            // Sort
            if (tree.config.sort) {
                nodes = sortBy(nodes, tree.config.sort);
            }

            model = collectionToModel(nodes);

            tree.emit('model.loaded', model);
            dom.applyChanges();
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
                collection[i] = tree.recurseDown(element, iteratee);
            });
        }

        else if (isObject(collection)) {
            collection = iteratee(collection);

            if (!collection) {
                throw new Error('Iteratee returned invalid object. Did you forget "return"?');
            }

            // Recurse children
            if (isArrayLike(collection.children) && !isEmpty(collection.children)) {
                collection.children = tree.recurseDown(collection.children, iteratee);
            }
        }

        return collection;
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

            return node;
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

    /**
     * Shows all nodes.
     *
     * @category Tree
     * @return {void}
     */
    tree.showAll = function() {
        dom.batch();
        tree.recurseDown(tree.getNodes(), function(node) {
            return node.show();
        });
        dom.end();
    };

    // Connect to our target DOM element
    dom.attach(tree.config.target);

    // Load initial user data
    data.load(tree.config.data);

    return tree;
};

// Mixin EventEmitter
InspireTree.prototype = Object.create(EventEmitter.prototype);

module.exports = InspireTree;
