'use strict';

// Libs
import * as _ from 'lodash';
import { create as createElement, diff, h, patch } from 'virtual-dom';
import { DOMReference } from './lib/DOMReference';
import uuid from 'uuid';
import { VCache } from './lib/VCache';
import { VArrayDirtyCompare } from './lib/VArrayDirtyCompare';
import { VStateCompare } from './lib/VStateCompare';

/**
 * Helper method to create an object for a new node.
 *
 * @private
 * @return {void}
 */
function blankNode() {
    return {
        text: 'New Node',
        itree: {
            state: {
                editing: true,
                focused: true
            }
        }
    };
}

/**
 * Default InspireTree rendering logic.
 *
 * @category DOM
 * @return {InspireDOM} Default renderer.
 */
export default class InspireDOM {
    constructor(tree) {
        // Init properties
        this._tree = tree;
        this.batching = 0;
        this.dropTargets = [];
        this.$scrollLayer;

        // Cache because we use in loops
        this.isDynamic = _.isFunction(this._tree.config.data);
        this.contextMenuChoices = this._tree.config.contextMenu;
    }

    /**
     * Apply pending data changes to the DOM.
     *
     * Will skip rendering as long as any calls
     * to `batch` have yet to be resolved,
     *
     * @category DOM
     * @private
     * @return {void}
     */
    applyChanges() {
        // Never rerender when until batch complete
        if (this.batching > 0) {
            return;
        }

        this.renderNodes();
    }

    /**
     * Attaches to the DOM element for rendering.
     *
     * @category DOM
     * @private
     * @param {HTMLElement} target Element, selector, or jQuery-like object.
     * @return {void}
     */
    attach(target) {
        var dom = this;
        dom.$target = dom.getElement(target);
        dom.$scrollLayer = dom.getScrollableAncestor(dom.$target);

        if (!dom.$target) {
            throw new Error('No valid element to attach to.');
        }

        // Set classnames
        var classNames = dom.$target.className.split(' ');
        classNames.push('inspire-tree');

        if (dom._tree.config.editable) {
            classNames.push('editable');

            _.each(_.pickBy(dom._tree.config.editing, _.identity), function(v, key) {
                classNames.push('editable-' + key);
            });
        }

        dom.$target.className = classNames.join(' ');
        dom.$target.setAttribute('tabindex', dom._tree.config.tabindex || 0);

        // Handle keyboard interaction
        dom.$target.addEventListener('keyup', dom.keyboardListener.bind(dom));

        if (dom.contextMenuChoices) {
            document.body.addEventListener('click', function() {
                dom.closeContextMenu();
            });
        }

        var dragTargetSelectors = dom._tree.config.dragTargets;
        if (!_.isEmpty(dragTargetSelectors)) {
            _.each(dragTargetSelectors, function(selector) {
                var dropTarget = dom.getElement(selector);

                if (dropTarget) {
                    dom.dropTargets.push(dropTarget);
                }
                else {
                    throw new Error('No valid element found for drop target ' + selector);
                }
            });
        }

        dom.isDragDropEnabled = dom.dropTargets.length > 0;

        if (dom.isDragDropEnabled) {
            document.addEventListener('mouseup', dom.mouseUpListener.bind(dom));
            document.addEventListener('mousemove', dom.mouseMoveListener.bind(dom));
        }

        // Sync browser focus to focus state
        dom._tree.on('node.focused', function(node) {
            var elem = node.itree.ref.node.querySelector('.title');
            if (elem !== document.activeElement) {
                elem.focus();
            }
        });

        // Set pagination limits
        this.pagination = {
            limit: this.getNodesLimit()
        };

        var limit = this.pagination.limit;
        dom._tree.on('model.loaded', () => {
            // Set context-specific pagination
            dom._tree.nodes().recurseDown(function(node) {
                if (node.children) {
                    node.itree.pagination = {
                        limit: limit,
                        total: node.hasChildren() ? node.children.length : -1
                    };
                }
            });
        });

        dom._tree.on('node.added', (node) => {
            if (node.children) {
                node.itree.pagination = {
                    limit: limit,
                    total: node.hasChildren() ? node.children.length : -1
                };
            }
        });

        // Listen for scrolls for automatic loading
        if ((dom._tree.config.dom.deferredRendering || dom._tree.config.deferredLoading) && dom._tree.config.dom.autoLoadMore) {
            dom.$target.addEventListener('scroll', _.throttle(dom.scrollListener.bind(dom), 20));
        }

        dom.$target.inspireTree = dom._tree;
    }

    /**
     * Disable rendering in preparation for multiple changes.
     *
     * @category DOM
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
     * Clear page text selection, primarily after a click event which
     * natively selects a range of text.
     *
     * @category DOM
     * @private
     * @return {void}
     */
    clearSelection() {
        if (document.selection && document.selection.empty) {
            document.selection.empty();
        }
        else if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
    }

    /**
     * Closes any open context menu.
     *
     * @category DOM
     * @private
     * @return {void}
     */
    closeContextMenu() {
        if (this.contextMenuNode) {
            this.contextMenuNode.parentNode.removeChild(this.contextMenuNode);
            this.contextMenuNode = null;
        }
    }

    /**
     * Creates a tri-state checkbox input.
     *
     * @param {TreeNode} node Node object.
     * @return {object} Input node element.
     */
    createCheckbox(node) {
        var dom = this;

        return new VCache({
            checked: node.checked(),
            indeterminate: node.indeterminate()
        }, VStateCompare, function() {
            return h('input', {
                attributes: {
                    type: 'checkbox'
                },
                checked: node.checked(),
                indeterminate: node.indeterminate(),
                onclick: function(event) {
                    // Define our default handler
                    var handler = function() {
                        node.toggleCheck();
                    };

                    // Emit an event with our forwarded MouseEvent, node, and default handler
                    dom._tree.emit('node.click', event, node, handler);

                    // Unless default is prevented, auto call our default handler
                    if (!event.treeDefaultPrevented) {
                        handler();
                    }
                }
            }, []);
        });
    }

    /**
     * Creates a context menu unordered list.
     *
     * @private
     * @param {array} choices Array of choice objects.
     * @param {object} node Clicked node.
     * @return {object} Unordered list node.
     */
    createContextMenu(choices, node) {
        var dom = this;

        return h('ul.itree-menu', {
            onclick: function(event) {
                event.stopPropagation();
            }
        }, _.transform(choices, function(contents, choice) {
            contents.push(dom.createContextMenuListItem(choice, node));
        }, []));
    }

    /**
     * Creates a context menu list item.
     *
     * @private
     * @param {object} choice Choice object.
     * @param {object} node Node object.
     * @return {object} List item node.
     */
    createContextMenuListItem(choice, node) {
        var dom = this;

        return h('li', [[
            h('a', {
                onclick: function(event) {
                    choice.handler(event, node, dom.closeContextMenu);
                }
            }, choice.text)
        ]]);
    }

    /**
     * Creates a draggable element by cloning a target,
     * registers a listener for mousemove.
     *
     * @private
     * @param {HTMLElement} element DOM Element.
     * @param {Event} event Click event to use.
     * @return {void}
     */
    createDraggableElement(element, event) {
        this.$dragNode = this.nodeFromTitleDOMElement(element);

        var rect = element.getBoundingClientRect();
        var diffX = event.clientX - rect.left;
        var diffY = event.clientY - rect.top;

        this.dragHandleOffset = { left: diffX, top: diffY };

        this.$dragElement = element.cloneNode(true);
        this.$dragElement.className += ' dragging';
        this.$dragElement.style.top = rect.top + 'px';
        this.$dragElement.style.left = rect.left + 'px';
        this.$target.appendChild(this.$dragElement);
    }

    /**
     * Creates an input field for editing node text.
     *
     * @private
     * @param {TreeNode} node Node object.
     * @return {object} Input element and buttons
     */
    createEditField(node) {
        var dom = this;

        return new VCache({}, VStateCompare, function() {
            var input = new DOMReference();

            var save = function() {
                // Update the text
                node.set('text', input.node.value);

                // Disable editing and update
                node.state('editing', false);
                node.markDirty();
                dom.applyChanges();
            };

            return h('form', {
                onsubmit: function(event) {
                    event.preventDefault();
                }
            }, [
                h('input', {
                    ref: input,
                    value: node.text,
                    onclick: function(event) {
                        // Prevent node click event from firing
                        event.stopPropagation();
                    },
                    onkeypress: function(event) {
                        if (event.which === 13) {
                            save();
                        }
                    }
                }),
                h('span.btn-group', [
                    h('button.btn.icon.icon-check', {
                        attributes: {
                            title: 'Save',
                            type: 'button'
                        },
                        onclick: function(event) {
                            event.stopPropagation();

                            save();
                        }
                    }),
                    h('button.btn.icon.icon-cross', {
                        attributes: {
                            title: 'Cancel',
                            type: 'button'
                        },
                        onclick: function(event) {
                            event.stopPropagation();

                            node.toggleEditing();
                        }
                    })
                ])
            ]);
        });
    };

    /**
     * Creates a list item node when a dynamic node returns no children.
     *
     * Cannot be clicked or expanded.
     *
     * @private
     * @param {boolean} unloaded If data has yet to load.
     * @return {object} List Item node.
     */
    createEmptyListItemNode(unloaded) {
        return new VCache({
            unloaded: unloaded
        }, VStateCompare, function() {
            return h('ol', [
                h('li.leaf', [
                    h('span.title.icon.icon-file-empty.empty', [unloaded ? 'Loading...' : 'No Results'])
                ])
            ]);
        });
    }

    /**
     * Creates a list item node for a specific data node.
     *
     * @private
     * @param {object} node Data node.
     * @return {object} List Item node.
     */
    createListItemNode(node) {
        var dom = this;

        return new VCache({
            dirty: node.itree.dirty,
            text: node.text
        }, VStateCompare, function() {
            // Mark as rendered
            node.state('rendered', true);

            var attributes = node.itree.li.attributes || {};
            node.itree.ref = new DOMReference();

            var buttons = [];
            var contents = [];

            // Add inline edit controls
            if (!node.editing() && dom._tree.config.editing.edit) {
                buttons.push(h('a.btn.icon.icon-pencil', {
                    attributes: {
                        title: 'Edit this node'
                    },
                    onclick: function(event) {
                        event.stopPropagation();

                        node.toggleEditing();
                    }
                }));
            }

            if (!node.editing() && dom._tree.config.editing.add) {
                buttons.push(h('a.btn.icon.icon-plus', {
                    attributes: {
                        title: 'Add a child node'
                    },
                    onclick: function(event) {
                        event.stopPropagation();

                        node.addChild(blankNode());
                        node.expand();
                    }
                }));
            }

            if (!node.editing() && dom._tree.config.editing.remove) {
                buttons.push(h('a.btn.icon.icon-minus', {
                    attributes: {
                        title: 'Remove this node'
                    },
                    onclick: function(event) {
                        event.stopPropagation();

                        node.remove();
                    }
                }));
            }

            if (buttons.length) {
                contents.push(h('span.btn-group', buttons));
            }

            contents.push(dom.createTitleContainer(node));
            contents.push(h('div.wholerow'));

            if (node.hasChildren()) {
                contents.push(dom.createOrderedList(node.children, node));
            }
            else if (dom.isDynamic && !node.hasLoadedChildren()) {
                contents.push(dom.createEmptyListItemNode(true));
            }
            else if (dom.isDynamic) {
                contents.push(dom.createEmptyListItemNode());
            }

            // Add classes for any enabled states
            // http://jsperf.com/object-keys-to-classnames
            var classNames = '.';
            var state = node.itree.state;
            _.each(state, function(value, key) {
                if (state[key]) {
                    classNames += '.' + key;
                }
            });

            // Inverse and additional classes
            if (!node.hidden() && node.removed()) {
                classNames += '.hidden';
            }

            if (node.expanded()) {
                classNames += '.expanded';
            }

            classNames += node.children ? '.folder' : '.leaf';

            // Append any custom class names
            var customClasses = attributes.class || attributes.className;
            if (_.isFunction(customClasses)) {
                customClasses = customClasses(node);
            }

            // Append content correctly
            if (customClasses) {
                if (_.isString(customClasses)) {
                    classNames += '.' + customClasses.replace(' ', '.');
                }
                else if (_.isArray(customClasses)) {
                    classNames += '.' + customClasses.join('.');
                }
            }

            // Force internal-use attributes
            attributes['data-uid'] = node.id;

            // Clear dirty bool only after everything has been generated
            node.itree.dirty = false;

            return h('li' + classNames, {
                attributes: attributes,
                ref: node.itree.ref
            }, contents);
        });
    }

    /**
     * Creates list item nodes for an array of data nodes.
     *
     * @private
     * @param {array} nodes Data nodes.
     * @return {array} Array of List Item nodes.
     */
    createListItemNodes(nodes) {
        return _.map(nodes, (node) => {
            // We can't just remove the node if soft-removed
            // https://github.com/Matt-Esch/virtual-dom/issues/333
            return this.createListItemNode(node);
        });
    }

    /**
     * Creates a list item node when a dynamic node returns no children.
     *
     * Cannot be clicked or expanded.
     *
     * @private
     * @param {boolean} unloaded If data has yet to load.
     * @return {object} List Item node.
     */
    createLoadingTextNode() {
        return new VCache({
            text: uuid()
        }, VStateCompare, function() {
            return h('li.leaf', [
                h('span.title.icon.icon-more', ['Loading...'])
            ]);
        });
    }

    /**
     * Creates an anchor that loads more nodes when clicked.
     *
     * Cannot be selected or expanded.
     *
     * @private
     * @param {TreeNode} context Parent node or undefined for root.
     * @return {object} List Item node.
     */
    createLoadMoreNode(context) {
        var dom = this;

        return new VCache({
            text: uuid()
        }, VStateCompare, function() {
            return h('li.leaf.detached', [
                h('a.title.icon.icon-more.load-more', {
                    onclick: (event) => {
                        event.preventDefault();

                        dom.loadMore(context, event);
                    }
                }, ['Load More'])
            ]);
        });
    }

    /**
     * Creates an ordered list containing list item for
     * provided data nodes.
     *
     * @private
     * @param {TreeNodes} nodes Data nodes.
     * @param {TreeNode} context Parent node, if any.
     * @return {object} Oredered List node.
     */
    createOrderedList(nodes, context) {
        var opts = {};
        var renderNodes = nodes;
        var pagination = this.getContextPagination(context);

        // If rendering deferred, chunk the nodes client-side
        if (this._tree.config.dom.deferredRendering) {
            // Determine the limit. Either for our current context or for the root level
            var limit = pagination.limit || this.getNodesLimit();

            // Slice the current nodes by this context's pagination
            renderNodes = _.slice(nodes, 0, limit);
        }

        return new VCache({
            nodes: renderNodes,
            nodeCount: renderNodes.length,
            loading: this.loading
        }, VArrayDirtyCompare, () => {
            var contents = [this.createListItemNodes(renderNodes)];

            // If deferred rendering and we have nodes remaining, show a Load More... link
            if ((this._tree.config.dom.deferredRendering || this._tree.config.deferredLoading) && pagination.limit < pagination.total) {
                if (!this.loading) {
                    contents.push(this.createLoadMoreNode(context));
                }
                else {
                    contents.push(this.createLoadingTextNode());
                }
            }

            return h('ol', opts, contents);
        });
    }

    /**
     * Creates an anchor around the node title.
     *
     * @private
     * @param {object} node Node object.
     * @param {boolean} hasOrWillHaveChildren If this node has children.
     * @return {object} Anchor node.
     */
    createTitleAnchor(node, hasOrWillHaveChildren) {
        var dom = this;

        return new VCache({
            editing: node.editing(),
            expanded: node.expanded(),
            icon: node.itree.icon,
            text: node.text,
            hasOrWillHaveChildren: hasOrWillHaveChildren
        }, VStateCompare, function(previous, current) {
            var attributes = node.itree.a.attributes || {};
            var classNames = ['title', 'icon'];

            if (!dom._tree.config.dom.showCheckboxes) {
                var folder = node.expanded() ? 'icon-folder-open' : 'icon-folder';
                classNames.push(current.state.icon || (hasOrWillHaveChildren ? folder : 'icon-file-empty'));
            }

            attributes.tabindex = 1;
            attributes.unselectable = 'on';

            var contents = [node.editing() ? dom.createEditField(node) : current.state.text];

            return h('a.' + classNames.join('.'), {
                attributes: attributes,
                onblur: function() {
                    node.blur();
                },
                oncontextmenu: function(event) {
                    if (dom.contextMenuChoices) {
                        // Define our default handler
                        var handler = function() {
                            dom.renderContextMenu(event, node);
                        };

                        // Emit an event with our forwarded MouseEvent, node, and default handler
                        dom._tree.emit('node.contextmenu', event, node, handler);

                        // Unless default is prevented, auto call our default handler
                        if (!event.treeDefaultPrevented) {
                            handler();
                        }
                    }
                },
                onclick: function(event) {
                    // Define our default handler
                    var handler = function() {
                        event.preventDefault();

                        if (node.editing()) {
                            return;
                        }

                        if (event.metaKey || event.ctrlKey || event.shiftKey) {
                            dom._tree.disableDeselection();
                        }

                        if (event.shiftKey) {
                            dom.clearSelection();

                            var selected = dom._tree.lastSelectedNode();
                            if (selected) {
                                dom._tree.selectBetween.apply(dom._tree, dom._tree.boundingNodes(selected, node));
                            }
                        }

                        if (node.selected()) {
                            if (!dom._tree.config.selection.disableDirectDeselection) {
                                node.deselect();
                            }
                        }
                        else {
                            node.select();
                        }

                        dom._tree.enableDeselection();
                    };

                    // Emit an event with our forwarded MouseEvent, node, and default handler
                    dom._tree.emit('node.click', event, node, handler);

                    // Unless default is prevented, auto call our default handler
                    if (!event.treeDefaultPrevented) {
                        handler();
                    }
                },
                ondblclick: function(event) {
                    // Define our default handler
                    var handler = function() {
                        // Clear text selection which occurs on double click
                        dom.clearSelection();

                        node.toggleCollapse();
                    };

                    // Emit an event with our forwarded MouseEvent, node, and default handler
                    dom._tree.emit('node.dblclick', event, node, handler);

                    // Unless default is prevented, auto call our default handler
                    if (!event.treeDefaultPrevented) {
                        handler();
                    }
                },
                onfocus: function() {
                    node.focus();
                },
                onmousedown: function() {
                    if (dom.isDragDropEnabled) {
                        dom.isMouseHeld = true;
                    }
                }
            }, contents);
        });
    }

    /**
     * Creates a container element for the title/toggle/icons.
     *
     * @private
     * @param {string} node Node object.
     * @return {object} Container node.
     */
    createTitleContainer(node) {
        var dom = this;
        var hasVisibleChildren = !dom.isDynamic ? node.hasVisibleChildren() : Boolean(node.children);

        return new VCache({
            checked: node.checked(),
            collapsed: node.collapsed(),
            dirty: node.itree.dirty,
            editing: node.editing(),
            hasVisibleChildren: hasVisibleChildren,
            indeterminate: node.indeterminate(),
            selected: node.selected(),
            text: node.text
        }, VStateCompare, function() {
            var contents = [];

            if (hasVisibleChildren) {
                contents.push(dom.createToggleAnchor(node));
            }

            if (dom._tree.config.dom.showCheckboxes) {
                contents.push(dom.createCheckbox(node));
            }

            contents.push(dom.createTitleAnchor(node, Boolean(node.children)));

            return h('div.title-wrap', contents);
        });
    }

    /**
     * Creates an anchor used for expanding and collapsing a node.
     *
     * @private
     * @param {object} node Node object.
     * @return {object} Anchor node.
     */
    createToggleAnchor(node) {
        return new VCache({
            collapsed: node.collapsed()
        }, VStateCompare, function(previous, current) {
            var icon = (current.state.collapsed ? '.icon-expand' : '.icon-collapse');

            return h('a.toggle.icon' + icon, {
                onclick: function() {
                    node.toggleCollapse();
                }
            }, []);
        });
    }

    /**
     * Permit rerendering of batched changes.
     *
     * @category DOM
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
     * Get the pagination for the given context node, or root if undefined.
     *
     * @param {TreeNode} context Context node.
     * @return {object} Pagination configuration object.
     */
    getContextPagination(context) {
        return context ? _.get(context, 'itree.pagination') : this.pagination;
    }

    /**
     * Get an HTMLElement through various means:
     * An element, jquery object, or a selector.
     *
     * @private
     * @param {mixed} target Element, jQuery selector, selector.
     * @return {HTMLElement} Matching element.
     */
    getElement(target) {
        var $element;

        if (target instanceof HTMLElement) {
            $element = target;
        }
        else if (_.isObject(target) && _.isObject(target[0])) {
            $element = target[0];
        }
        else if (_.isString(target)) {
            var match = document.querySelector(target);
            if (match) {
                $element = match;
            }
        }

        return $element;
    }

    /**
     * Get the max nodes per "page" we'll allow. Defaults to how many nodes can fit.
     *
     * @private
     * @return {integer} Node count
     */
    getNodesLimit() {
        var limit = this._tree.config.pagination.limit;
        return limit > 0 ? limit : _.ceil(this.$scrollLayer.clientHeight / this._tree.config.dom.nodeHeight);
    }

    /**
     * Helper method to find a scrollable ancestor element.
     *
     * @param  {HTMLElement} $element Starting element.
     * @return {HTMLElement} Scrollable element.
     */
    getScrollableAncestor($element) {
        if ($element instanceof Element) {
            var style = getComputedStyle($element);
            if (style.overflow !== 'auto' && $element.parentNode) {
                $element = this.getScrollableAncestor($element.parentNode);
            }
        }

        return $element;
    }

    /**
     * Listen to keyboard event for navigation.
     *
     * @private
     * @param {Event} event Keyboard event.
     * @return {void}
     */
    keyboardListener(event) {
        // Navigation
        var focusedNode = this._tree.focused();
        if (focusedNode) {
            focusedNode = focusedNode[0];
            switch (event.which) {
                case 40:
                    this.moveFocusDownFrom(focusedNode);
                    break;
                case 13:
                    focusedNode.toggleSelect();
                    break;
                case 37:
                    focusedNode.collapse();
                    break;
                case 39:
                    focusedNode.expand();
                    break;
                case 38:
                    this.moveFocusUpFrom(focusedNode);
                    break;
                default:
            }
        }
    }

    /**
     * Loads/renders additional nodes for a given context, or the root.
     *
     * @private
     * @param {TreeNode} context Parent node, or none for root.
     * @param {Event} event Click or scroll event which triggered this call.
     * @return {Promise} Resolves with request results.
     */
    loadMore(context, event) {
        if (this.loading) {
            return;
        }

        var pagination = this.getContextPagination(context);
        var promise;

        // Set loading flag, prevents repeat requests
        this.loading = true;
        this.batch();

        // Mark this context as dirty since we'll update text/tree nodes
        _.invoke(context, 'markDirty');

        // Increment the pagination
        pagination.limit += this.getNodesLimit();

        // Emit an event
        this._tree.emit('node.paginate', context, pagination, event);

        if (this._tree.config.deferredLoading) {
            if (context) {
                promise = context.loadChildren();
            }
            else {
                promise = this._tree.load(this._tree.config.data);
            }
        }
        else {
            this.loading = false;
        }

        this.end();

        // Clear the loading flag
        if (this._tree.config.deferredLoading) {
            promise.then(() => {
                this.loading = false;
                this.applyChanges();
            }).catch(function() {
                this.loading = false;
                this.applyChanges();
            });
        }

        return promise;
    }

    /**
     * Listener for mouse move events for drag and drop.
     * Is removed automatically on mouse up.
     *
     * @private
     * @param {Event} event Mouse move event.
     * @return {void}
     */
    mouseMoveListener(event) {
        if (this.isMouseHeld && !this.$dragElement) {
            this.createDraggableElement(event.target, event);
        }
        else if (this.$dragElement) {
            event.preventDefault();
            event.stopPropagation();

            var x = event.clientX - this.dragHandleOffset.left;
            var y = event.clientY - this.dragHandleOffset.top;

            this.$dragElement.style.left = x + 'px';
            this.$dragElement.style.top = y + 'px';

            var validTarget;
            _.each(this.dropTargets, function(target) {
                var rect = target.getBoundingClientRect();

                if (event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom) {
                    validTarget = target;
                    return false;
                }
            });

            // If new target found for the first time
            if (!this.$activeDropTarget && validTarget && validTarget.className.indexOf('itree-active-drop-target') === -1) {
                validTarget.className += ' itree-active-drop-target';
            }

            this.$activeDropTarget = validTarget;
        }
    }

    /**
     * Handle mouse up events for dragged elements.
     *
     * @return {void}
     */
    mouseUpListener() {
        this.isMouseHeld = false;

        if (this.$dragElement) {
            this.$dragElement.parentNode.removeChild(this.$dragElement);

            if (this.$activeDropTarget) {
                var targetIsTree = _.isFunction(_.get(this.$activeDropTarget, 'inspireTree.addNode'));

                // Notify that the node was "dropped out" of this tree
                this._tree.emit('node.dropout', this.$dragNode, this.$activeDropTarget, targetIsTree);

                // If drop target supports the addNode method, invoke it
                if (targetIsTree) {
                    var newNode = this.$activeDropTarget.inspireTree.addNode(this.$dragNode.copyHierarchy().toObject());

                    // Notify that the node was "dropped out"
                    this.$activeDropTarget.inspireTree.emit('node.dropin', newNode);
                }
            }
        }

        if (this.$activeDropTarget) {
            this.$activeDropTarget.className = this.$activeDropTarget.className.replace('itree-active-drop-target', '');
        }

        this.$dragNode = null;
        this.$dragElement = null;
        this.$activeDropTarget = null;
    }

    /**
     * Move select down the visible tree from a starting node.
     *
     * @private
     * @param {object} startingNode Node object.
     * @return {void}
     */
    moveFocusDownFrom(startingNode) {
        var next = startingNode.nextVisibleNode();
        if (next) {
            next.focus();
        }
    }

   /**
    * Move select up the visible tree from a starting node.
    *
    * @private
    * @param {object} startingNode Node object.
    * @return {void}
    */
    moveFocusUpFrom(startingNode) {
        var prev = startingNode.previousVisibleNode();
        if (prev) {
            prev.focus();
        }
    }

    /**
     * Helper method for obtaining the data-uid from a DOM element.
     *
     * @private
     * @param {HTMLElement} element HTML Element.
     * @return {object} Node object
     */
    nodeFromTitleDOMElement(element) {
        var uid = element.parentNode.parentNode.getAttribute('data-uid');
        return this._tree.node(uid);
    }

    /**
     * Renders a context menu for a given contextmenu click and node.
     *
     * @private
     * @param {object} event Click event.
     * @param {object} node Clicked node object.
     * @return {void}
     */
    renderContextMenu(event, node) {
        var choices = this.contextMenuChoices;

        if (_.isArrayLike(choices)) {
            event.preventDefault();

            if (!this.contextMenuNode) {
                var ul = this.createContextMenu(choices, node);
                this.contextMenuNode = createElement(ul);
                document.body.appendChild(this.contextMenuNode);
            }

            this.contextMenuNode.style.top = event.clientY + 'px';
            this.contextMenuNode.style.left = event.clientX + 'px';
        }
    }

    /**
     * Triggers rendering for the given node array.
     *
     * @category DOM
     * @private
     * @param {array} nodes Array of node objects.
     * @return {void}
     */
    renderNodes(nodes) {
        if (this.rendering) {
            return;
        }

        this.rendering = true;

        var newOl = this.createOrderedList(nodes || this._tree.nodes());

        if (!this.rootNode) {
            this.rootNode = createElement(newOl);
            this.$target.appendChild(this.rootNode);

            if (this._tree.config.editing.add) {
                this.$target.appendChild(createElement(new VCache({}, VArrayDirtyCompare, () => {
                    return h('a.btn.icon.icon-plus', {
                        attributes: {
                            title: 'Add a new root node'
                        },
                        onclick: function() {
                            this._tree.focused().blur();

                            this._tree.addNode(blankNode());
                        }
                    });
                })));
            }
        }
        else {
            var patches = diff(this.ol, newOl);
            this.rootNode = patch(this.rootNode, patches);
        }

        this.ol = newOl;
        this.rendering = false;
    };

    /**
     * Listens for scroll events, to automatically trigger
     * Load More links when they're scrolled into view.
     *
     * @category DOM
     * @private
     * @param {Event} event Scroll event.
     * @return {void}
     */
    scrollListener(event) {
        if (!this.rendering && !this.loading) {
            // Get the bounding rect of the scroll layer
            var rect = this.$scrollLayer.getBoundingClientRect();

            // Find all load-more links
            var links = document.querySelectorAll('.load-more');
            _.each(links, (link) => {
                // Look for load-more links which overlap our "viewport"
                var r = link.getBoundingClientRect();
                var overlap = !(rect.right < r.left || rect.left > r.right || rect.bottom < r.top || rect.top > r.bottom);

                if (overlap) {
                    // Auto-trigger Load More links
                    var context;

                    var $parent = link.parentNode.parentNode.parentNode;
                    if ($parent.tagName === 'LI') {
                        context = this._tree.node($parent.getAttribute('data-uid'));
                    }

                    this.loadMore(context, event);
                }
            });
        }
    }

    /**
     * Scroll the first selected node into view.
     *
     * @category DOM
     * @private
     * @return {void}
     */
    scrollSelectedIntoView() {
        var $tree = document.querySelector('.inspire-tree');
        var $selected = $tree.querySelector('.selected');

        if ($selected && dom.$scrollLayer) {
            dom.$scrollLayer.scrollTop = $selected.offsetTop;
        }
    }
}
