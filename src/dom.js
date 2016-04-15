'use strict';

// Libs
import _ from 'lodash';
import createElement from 'virtual-dom/create-element';
import diff from 'virtual-dom/diff';
import h from 'virtual-dom/h';
import keyCodes from 'key-codes';
import patch from 'virtual-dom/patch';
import VCache from './lib/VCache';
import VArrayDirtyCompare from './lib/VArrayDirtyCompare';
import VDirtyCompare from './lib/VDirtyCompare';
import VStateCompare from './lib/VStateCompare';

module.exports = function InspireDOM(tree) {
    var $activeDropTarget;
    var $dragElement;
    var $dragNode;
    var $target;
    var dragHandleOffset;
    var dropTargets = [];
    var isDragDropEnabled = false;
    var isMouseHeld = false;

    // Cache because we use in loops
    var isDynamic = _.isFunction(tree.config.data);
    var contextMenuChoices = tree.config.contextMenu;

    /**
     * Clear page text selection, primarily after a click event which
     * nativelt selects a range of text.
     *
     * @category DOM
     * @private
     * @return {void}
     */
    function clearSelection() {
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
    function closeContextMenu() {
        if (contextMenuNode) {
            contextMenuNode.parentNode.removeChild(contextMenuNode);
            contextMenuNode = null;
        }
    };

    /**
     * Creates a tri-state checkbox input.
     *
     * @param {TreeNode} node Node object.
     * @return {object} Input node element.
     */
    function createCheckbox(node) {
        return new VCache({
            selected: node.selected(),
            indeterminate: node.itree.state.indeterminate
        }, VStateCompare, function() {
            return h('input', {
                attributes: {
                    type: 'checkbox'
                },
                checked: node.selected(),
                indeterminate: node.itree.state.indeterminate,
                onclick: function(event) {
                    node.toggleSelect();

                    // Emit
                    tree.emit('node.click', event, node);
                }
            });
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
    function createContextMenu(choices, node) {
        return h('ul.itree-menu', {
            onclick: function(event) {
                event.stopPropagation();
            }
        }, _.transform(choices, function(contents, choice) {
            contents.push(createContextMenuListItem(choice, node));
        }));
    }

    /**
     * Creates a context menu list item.
     *
     * @private
     * @param {object} choice Choice object.
     * @param {object} node Node object.
     * @return {object} List item node.
     */
    function createContextMenuListItem(choice, node) {
        return h('li', [[
            h('a', {
                onclick: function(event) {
                    choice.handler(event, node, closeContextMenu);
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
    function createDraggableElement(element, event) {
        $dragNode = nodeFromTitleDOMElement(element);

        var offset = getAbsoluteOffset(element);
        var diffX = event.clientX - offset.left;
        var diffY = event.clientY - offset.top;

        dragHandleOffset = { left: diffX, top: diffY };

        $dragElement = element.cloneNode(true);
        $dragElement.className += ' dragging';
        $dragElement.style.top = offset.top + 'px';
        $dragElement.style.left = offset.left + 'px';
        $target.appendChild($dragElement);
    }

    /**
     * Creates a list item node when a dynamic node returns no children.
     *
     * Cannot be clicked or expanded.
     *
     * @private
     * @return {object} List Item node.
     */
    function createEmptyListItemNode() {
        return new VCache({}, VStateCompare, function() {
            return h('ol', [
                h('li', [
                    h('span.title.icon.icon-file-empty.empty', ['No Results'])
                ])
            ]);
        });
    };

    /**
     * Creates a list item node for a specific data node.
     *
     * @private
     * @param {object} node Data node.
     * @return {object} List Item node.
     */
    function createListItemNode(node) {
        return new VCache({
            dirty: node.itree.dirty
        }, VDirtyCompare, function() {
            node.itree.dirty = false;

            var contents = [
                createTitleContainer(node),
                h('div.wholerow')
            ];

            if (node.hasChildren()) {
                contents.push(createOrderedList(node.children));
            }
            else if (isDynamic) {
                contents.push(createEmptyListItemNode());
            }

            // Add classes for any enabled states
            // http://jsperf.com/object-keys-to-classnames
            var classNames = '.';
            var state = node.itree.state;
            _.each(Object.keys(state), function(key) {
                if (state[key]) {
                    classNames += '.' + key;
                }
            });

            if (!node.hidden() && node.removed()) {
                classNames += '.hidden';
            }

            var attributes = node.itree.li.attributes || {};

            // Force internal-use attributes
            attributes['data-uid'] = node.id;

            return h('li' + classNames, { attributes: attributes }, contents);
        });
    };

    /**
     * Creates list item nodes for an array of data nodes.
     *
     * @private
     * @param {array} nodes Data nodes.
     * @return {array} Array of List Item nodes.
     */
    function createListItemNodes(nodes) {
        var domNodes = [];

        _.each(nodes, function(node) {
            // We can't just remove the node if soft-removed
            // https://github.com/Matt-Esch/virtual-dom/issues/333
            domNodes.push(createListItemNode(node));
        });

        return domNodes;
    };

    /**
     * Creates an ordered list containing list item for
     * provided data nodes.
     *
     * @private
     * @param {array} nodes Data nodes.
     * @return {object} Oredered List node.
     */
    function createOrderedList(nodes) {
        return new VCache({
            nodes: nodes,
            nodeCount: nodes.length
        }, VArrayDirtyCompare, function() {
            return h('ol', createListItemNodes(nodes));
        });
    };

    /**
     * Creates an anchor around the node title.
     *
     * @private
     * @param {object} node Node object.
     * @param {boolean} hasVisibleChildren If this node has visible children.
     * @return {object} Anchor node.
     */
    function createTitleAnchor(node, hasVisibleChildren) {
        return new VCache({
            icon: node.itree.icon,
            text: node.text,
            hasVisibleChildren: hasVisibleChildren
        }, VStateCompare, function(previous, current) {
            var classNames = ['title', 'icon'];

            if (!tree.config.showCheckboxes) {
                classNames.push(current.state.icon || (hasVisibleChildren ? 'icon-folder' : 'icon-file-empty'));
            }

            return h('a.' + classNames.join('.'), {
                attributes: {
                    unselectable: 'on'
                },
                oncontextmenu: function(event) {
                    if (contextMenuChoices) {
                        renderContextMenu(event, node);

                        // Emit
                        tree.emit('node.contextmenu', event, node);
                    }
                },
                onclick: function(event) {
                    event.preventDefault();

                    if (event.metaKey || event.ctrlKey || event.shiftKey) {
                        tree.disableDeselection();
                    }

                    if (event.shiftKey) {
                        clearSelection();

                        var selected = tree.lastSelectedNode();
                        if (selected) {
                            tree.selectBetween.apply(tree, tree.boundingNodes(selected, node));
                        }
                    }

                    node.toggleSelect();
                    tree.enableDeselection();

                    // Emit
                    tree.emit('node.click', event, node);
                },
                ondblclick: function(event) {
                    // // Clear text selection which occurs on double click
                    clearSelection();

                    node.toggleCollapse();

                    // Emit
                    tree.emit('node.dblclick', event, node);
                },
                onmousedown: function() {
                    if (isDragDropEnabled) {
                        isMouseHeld = true;
                    }
                }
            }, [current.state.text]);
        });
    }

    /**
     * Creates a container element for the title/toggle/icons.
     *
     * @private
     * @param {string} node Node object.
     * @return {object} Container node.
     */
    function createTitleContainer(node) {
        var hasVisibleChildren = !isDynamic ? node.hasVisibleChildren() : Boolean(node.children);

        return new VCache({
            hasVisibleChildren: hasVisibleChildren,
            collapsed: node.collapsed(),
            selected: node.selected(),
            indeterminate: node.itree.state.indeterminate
        }, VStateCompare, function() {
            var contents = [];

            if (hasVisibleChildren) {
                contents.push(createToggleAnchor(node));
            }

            if (tree.config.showCheckboxes) {
                contents.push(createCheckbox(node));
            }

            contents.push(createTitleAnchor(node, hasVisibleChildren));

            return h('div.title-wrap', contents);
        });
    };

    /**
     * Creates an anchor used for expanding and collapsing a node.
     *
     * @private
     * @param {object} node Node object.
     * @return {object} Anchor node.
     */
    function createToggleAnchor(node) {
        return new VCache({
            collapsed: node.collapsed()
        }, VStateCompare, function(previous, current) {
            var caret = (current.state.collapsed ? '.icon-caret' : '.icon-caret-down');

            return h('a.toggle.icon' + caret, { onclick: function() {
                node.toggleCollapse();
            } });
        });
    }

    /**
     * Calculcates the absolute offset values of an element.
     *
     * @private
     * @param {HTMLElement} element HTML Element.
     * @return {object} Object with top/left values.
     */
    function getAbsoluteOffset(element) {
        var x = 0;
        var y = 0;

        while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
            x += element.offsetLeft - element.scrollLeft;
            y += element.offsetTop - element.scrollTop;
            element = element.offsetParent;
        }

        // IE10 stores scroll values on documentElement instead.
        // Due to unit testing, document may not always exist
        if (typeof document !== 'undefined') {
            x -= document.documentElement.scrollLeft;
            y -= document.documentElement.scrollTop;
        }

        return { top: y, left: x };
    }

    /**
     * Get an HTMLElement through various means:
     * An element, jquery object, or a selector.
     *
     * @private
     * @param {mixed} target Element, jQuery selector, selector.
     * @return {HTMLElement} Matching element.
     */
    function getElement(target) {
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
     * Helper method for obtaining the data-uid from a DOM element.
     *
     * @private
     * @param {HTMLElement} element HTML Element.
     * @return {object} Node object
     */
    function nodeFromTitleDOMElement(element) {
        var uid = element.parentNode.parentNode.getAttribute('data-uid');
        return tree.node(uid);
    }

    /**
     * Helper method to find a scrollable ancestor element.
     *
     * @param  {HTMLElement} $element Starting element.
     * @return {HTMLElement} Scrollable element.
     */
    function getScrollableAncestor($element) {
        if ($element instanceof Element) {
            var style = getComputedStyle($element);
            if (style.overflow !== 'auto' && $element.parentNode) {
                $element = getScrollableAncestor($element.parentNode);
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
    function keyboardListener(event) {
        // Navigation
        var focusedNode = tree.focused();
        if (focusedNode) {
            focusedNode = focusedNode[0];
            switch (event.which) {
                case keyCodes.DOWN:
                    moveFocusDownFrom(focusedNode);
                    break;
                case keyCodes.ENTER:
                    focusedNode.toggleSelect();
                    break;
                case keyCodes.LEFT:
                    focusedNode.collapse();
                    moveFocusUpFrom(focusedNode);
                    break;
                case keyCodes.RIGHT:
                    focusedNode.expand();
                    moveFocusDownFrom(focusedNode);
                    break;
                case keyCodes.UP:
                    moveFocusUpFrom(focusedNode);
                    break;
                default:
            }
        }
    }

    /**
     * Listener for mouse move events for drag and drop.
     * Is removed automatically on mouse up.
     *
     * @private
     * @param {Event} event Mouse move event.
     * @return {void}
     */
    function mouseMoveListener(event) {
        if (isMouseHeld && !$dragElement) {
            createDraggableElement(event.target, event);
        }
        else if ($dragElement) {
            event.preventDefault();
            event.stopPropagation();

            var x = event.clientX - dragHandleOffset.left;
            var y = event.clientY - dragHandleOffset.top;

            $dragElement.style.left = x + 'px';
            $dragElement.style.top = y + 'px';

            var validTarget;
            _.each(dropTargets, function(target) {
                var rect = target.getBoundingClientRect();

                if (event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom) {
                    validTarget = target;
                    return false;
                }
            });

            // If new target found for the first time
            if (!$activeDropTarget && validTarget && validTarget.className.indexOf('drop-target') === -1) {
                validTarget.className += ' drop-target';
            }

            $activeDropTarget = validTarget;
        }
    };

    /**
     * Handle mouse up events for dragged elements.
     *
     * @return {void}
     */
    function mouseUpListener() {
        isMouseHeld = false;

        if ($dragElement) {
            $dragElement.parentNode.removeChild($dragElement);

            if ($activeDropTarget && $activeDropTarget.inspireTree) {
                var newNode = $activeDropTarget.inspireTree.addNode($dragNode.copyHierarchy().export());

                tree.emit('node.dropout', $dragNode, $activeDropTarget);
                $activeDropTarget.inspireTree.emit('node.dropin', newNode);
            }
        }

        if ($activeDropTarget) {
            $activeDropTarget.className = $activeDropTarget.className.replace('drop-target', '');
        }

        $dragNode = null;
        $dragElement = null;
        $activeDropTarget = null;
    }

    /**
     * Move select down the visible tree from a starting node.
     *
     * @private
     * @param {object} startingNode Node object.
     * @return {void}
     */
    function moveFocusDownFrom(startingNode) {
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
    function moveFocusUpFrom(startingNode) {
        var prev = startingNode.previousVisibleNode();
        if (prev) {
            prev.focus();
        }
    }

    var contextMenuNode;

    /**
     * Renders a context menu for a given contextmenu click and node.
     *
     * @private
     * @param {object} event Click event.
     * @param {object} node Clicked node object.
     * @return {void}
     */
    function renderContextMenu(event, node) {
        var choices = contextMenuChoices;

        if (_.isArrayLike(choices)) {
            event.preventDefault();

            if (!contextMenuNode) {
                var ul = createContextMenu(choices, node);
                contextMenuNode = createElement(ul);
                document.body.appendChild(contextMenuNode);
            }

            contextMenuNode.style.top = event.clientY + 'px';
            contextMenuNode.style.left = event.clientX + 'px';
        }
    }

    // Cache our root node, so we can patch re-render in the future.
    var rootNode;
    var ol;

    /**
     * Triggers rendering for the given node array.
     *
     * @category DOM
     * @private
     * @param {array} nodes Array of node objects.
     * @return {void}
     */
    function renderNodes(nodes) {
        var newOl = createOrderedList(nodes || tree.nodes(), true);

        if (!rootNode) {
            rootNode = createElement(newOl);
            $target.appendChild(rootNode);
        }
        else {
            var patches = diff(ol, newOl);
            rootNode = patch(rootNode, patches);
        }

        ol = newOl;
    };

    var dom = this;
    var batching = 0;

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
    dom.applyChanges = function() {
        // Never rerender when until batch complete
        if (batching > 0) {
            return;
        }

        renderNodes();
    };

    /**
     * Attaches to the DOM element for rendering.
     *
     * @category DOM
     * @private
     * @param {HTMLElement} target Element, selector, or jQuery-like object.
     * @return {void}
     */
    dom.attach = function(target) {
        $target = getElement(target);

        if (!$target) {
            throw new Error('No valid element to attach to.');
        }

        $target.className += ' inspire-tree';
        $target.setAttribute('tabindex', tree.config.tabindex || -1);

        // Handle keyboard interaction
        $target.addEventListener('keyup', keyboardListener);

        if (contextMenuChoices) {
            document.body.addEventListener('click', function() {
                closeContextMenu();
            });
        }

        var dragTargetSelectors = tree.config.dragTargets;
        if (!_.isEmpty(dragTargetSelectors)) {
            _.each(dragTargetSelectors, function(selector) {
                var dropTarget = getElement(selector);

                if (dropTarget) {
                    dropTargets.push(dropTarget);
                }
                else {
                    throw new Error('No valid element found for drop target ' + selector);
                }
            });
        }

        isDragDropEnabled = dropTargets.length > 0;

        if (isDragDropEnabled) {
            document.addEventListener('mouseup', mouseUpListener);
            document.addEventListener('mousemove', mouseMoveListener);
        }

        $target.addEventListener('blur', function() {
            tree.focused().blur();
        });

        $target.inspireTree = tree;
    };

    /**
     * Disable rendering in preparation for multiple changes.
     *
     * @category DOM
     * @private
     * @return {void}
     */
    dom.batch = function() {
        if (batching < 0) {
            batching = 0;
        }

        batching++;
    };

    /**
     * Permit rerendering of batched changes.
     *
     * @category DOM
     * @private
     * @return {void}
     */
    dom.end = function() {
        batching--;

        if (batching === 0) {
            dom.applyChanges();
        }
    };

    /**
     * Scroll the first selected node into view.
     *
     * @category DOM
     * @private
     * @return {void}
     */
    dom.scrollSelectedIntoView = function() {
        var $tree = document.querySelector('.inspire-tree');
        var $selected = $tree.querySelector('.selected');

        if ($selected) {
            var $container = getScrollableAncestor($tree);

            if ($container) {
                $container.scrollTop = $selected.offsetTop;
            }
        }
    };

    return dom;
};
