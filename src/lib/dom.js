'use strict';

// Libs
var createElement = require('virtual-dom/create-element');
var each = require('lodash.foreach');
var diff = require('virtual-dom/diff');
var get = require('lodash.get');
var h = require('virtual-dom/h');
var isArrayLike = require('./isArrayLike');
var isEmpty = require('lodash.isempty');
var isObject = require('lodash.isobject');
var isString = require('lodash.isstring');
var keyCodes = require('key-codes');
var patch = require('virtual-dom/patch');
var transform = require('lodash.transform');
var VCache = require('./VCache');
var VArrayDirtyCompare = require('./VArrayDirtyCompare');
var VDirtyCompare = require('./VDirtyCompare');
var VStateCompare = require('./VStateCompare');

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
    var isDynamic = tree.config.dynamic;
    var contextMenuChoices = tree.config.contextMenu;

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
        }, transform(choices, function(contents, choice) {
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
    function createDraggableElement(element, event) {
        $dragNode = getNodeFromTitleDOMElement(element);

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
                h('div.wholerow'),
                createTitleContainer(node)
            ];

            if (!isEmpty(node.children)) {
                contents.push(createOrderedList(node.children));
            }
            else if (isDynamic && isArrayLike(node.children)) {
                contents.push(createEmptyListItemNode());
            }

            // Add classes for any enabled states
            // http://jsperf.com/object-keys-to-classnames
            var classNames = '.';
            var state = node.itree.state;
            each(Object.keys(state), function(key) {
                if (state[key]) {
                    classNames += '.' + key;
                }
            });

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

        each(nodes, function(node) {
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
            nodes: nodes
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

            classNames.push(current.state.icon || (hasVisibleChildren ? 'icon-folder' : 'icon-file-empty'));

            return h('a.' + classNames.join('.'), {
                oncontextmenu: function(event) {
                    if (contextMenuChoices) {
                        renderContextMenu(event, node);

                        // Emit
                        tree.emit('node.contextmenu', event, node);
                    }
                },
                onclick: function(event) {
                    // Toggle selected state
                    if (node.selected()) {
                        node.deselect();
                    }
                    else {
                        node.select();
                    }

                    // Emit
                    tree.emit('node.click', event, node);
                },
                ondblclick: function(event) {
                    var node = getNodeFromTitleDOMElement(event.target);

                    // Toggle selected state
                    if (node.collapsed()) {
                        node.expand();
                    }
                    else {
                        node.collapse();
                    }

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
            collapsed: node.itree.state.collapsed
        }, VStateCompare, function() {
            var contents = [];

            if (hasVisibleChildren) {
                contents.push(createToggleAnchor(node));
            }

            contents.push(createTitleAnchor(node, hasVisibleChildren));

            return h('div', contents);
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
            collapsed: node.itree.state.collapsed
        }, VStateCompare, function(previous, current) {
            var caret = (current.state.collapsed ? '.icon-caret' : '.icon-caret-down');

            return h('a.toggle.icon' + caret, { onclick: function() {
                // Toggle selected state
                if (node.collapsed()) {
                    node.expand();
                }
                else {
                    node.collapse();
                }
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
        else if (isObject(target) && isObject(target[0])) {
            $element = target[0];
        }
        else if (isString(target)) {
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
    function getNodeFromTitleDOMElement(element) {
        var uid = element.parentNode.parentNode.getAttribute('data-uid');
        return tree.getNode(uid);
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
        var selected = tree.getSelectedNodes();
        if (selected.length === 1) {
            var focusedNode = selected[0];

            switch (event.which) {
                case keyCodes.UP:
                    moveSelectionUpFrom(focusedNode);
                    break;
                case keyCodes.DOWN:
                    moveSelectionDownFrom(focusedNode);
                    break;
                case keyCodes.ENTER: {
                    if (focusedNode.collapsed()) {
                        focusedNode.expand();
                    }
                    else {
                        focusedNode.collapse();
                    }
                    break;
                }
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
            each(dropTargets, function(target) {
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
                $activeDropTarget.inspireTree.addNode($dragNode.export());

                tree.emit('node.drop', $dragNode, $activeDropTarget);
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
    function moveSelectionDownFrom(startingNode) {
        var next = startingNode.nextVisibleNode();
        if (next) {
            next.select();
        }
    }

    /**
     * Move select up the visible tree from a starting node.
     *
     * @private
     * @param {object} startingNode Node object.
     * @return {void}
     */
    function moveSelectionUpFrom(startingNode) {
        var prev = startingNode.previousVisibleNode();
        if (prev) {
            prev.select();
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

        if (isArrayLike(choices)) {
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

        dom.renderNodes();
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
        $target.setAttribute('tabindex', get(tree, 'config.tabindex') || 0);

        // Handle keyboard interaction
        $target.addEventListener('keyup', keyboardListener);

        if (contextMenuChoices) {
            document.body.addEventListener('click', function() {
                dom.closeContextMenu();
            });
        }

        var dragTargetSelectors = get(tree, 'config.dragTargets');
        if (!isEmpty(dragTargetSelectors)) {
            each(dragTargetSelectors, function(selector) {
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
        batching++;
    };

    /**
     * Closes any open context menu.
     *
     * @category DOM
     * @private
     * @return {void}
     */
    dom.closeContextMenu = function() {
        if (contextMenuNode) {
            contextMenuNode.parentNode.removeChild(contextMenuNode);
            contextMenuNode = null;
        }
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
    dom.renderNodes = function(nodes) {
        var newOl = createOrderedList(nodes || tree.getNodes(), true);

        if (!rootNode) {
            rootNode = createElement(newOl);
            $target.appendChild(rootNode);

            tree.emit('tree.ready');
        }
        else {
            var patches = diff(ol, newOl);
            rootNode = patch(rootNode, patches);
        }

        ol = newOl;
    };

    return dom;
};
