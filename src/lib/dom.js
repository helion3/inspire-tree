'use strict';

// Libs
var createElement = require('virtual-dom/create-element');
var each = require('lodash.foreach');
var diff = require('virtual-dom/diff');
var filter = require('lodash.filter');
var get = require('lodash.get');
var h = require('virtual-dom/h');
var isArray = require('lodash.isarray');
var isEmpty = require('lodash.isempty');
var isObject = require('lodash.isobject');
var isString = require('lodash.isstring');
var patch = require('virtual-dom/patch');
var transform = require('lodash.transform');
var VCache = require('./VCache');
var VArrayDirtyCompare = require('./VArrayDirtyCompare');
var VDirtyCompare = require('./VDirtyCompare');
var VStateCompare = require('./VStateCompare');

module.exports = function InspireDOM(api) {
    var $activeDropTarget;
    var $dragElement;
    var $dragNode;
    var $target;
    var dragHandleOffset;
    var dropTargets = [];
    var isDragDropEnabled = false;

    // Cache because we use in loops
    var isDynamic = api.config.dynamic;
    var contextMenuChoices = api.config.contextMenu;

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
                    choice.handler(event, node);
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

        // Listen to mouse move
        document.addEventListener('mousemove', mouseMoveListener);
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
            else if (isDynamic && isArray(node.children)) {
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
        return transform(nodes, function(elements, node) {
            elements.push(createListItemNode(node));
        });
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
                        api.events.emit('node.contextmenu', event, node);
                    }
                },
                onclick: function(event) {
                    // Toggle selected state
                    if (node.itree.state.selected) {
                        api.data.deselectNode(node);
                    }
                    else {
                        api.data.selectNode(node);
                    }

                    // Emit
                    api.events.emit('node.click', event, node);
                },
                ondblclick: function(event) {
                    var node = getNodeFromTitleDOMElement(event.target);

                    // Toggle selected state
                    if (node.itree.state.collapsed) {
                        api.dom.expandNode(node);
                    }
                    else {
                        api.dom.collapseNode(node);
                    }

                    // Emit
                    api.events.emit('node.dblclick', event, node);
                },
                onmousedown: function(event) {
                    if (isDragDropEnabled) {
                        createDraggableElement(event.target, event);
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
        var hasVisibleChildren = false;

        if (!isDynamic) {
            if (isArray(node.children)) {
                var hiddenCount = filter(node.children, 'itree.state.hidden', true).length;
                hasVisibleChildren = (hiddenCount < node.children.length);
            }
        }
        else {
            hasVisibleChildren = Boolean(node.children);
        }

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
                if (node.itree.state.collapsed) {
                    api.dom.expandNode(node);
                }
                else {
                    api.dom.collapseNode(node);
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
        return api.data.getNodeById(uid);
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
        if ($dragElement) {
            event.preventDefault();
            event.stopPropagation();

            var x = event.clientX - dragHandleOffset.left;
            var y = event.clientY - dragHandleOffset.top;

            $dragElement.style.left = x + 'px';
            $dragElement.style.top = y + 'px';

            var validTarget;
            each(dropTargets, function(target) {
                var rect = target.getBoundingClientRect();

                if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
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

        if (isArray(choices)) {
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
     * @return {[type]} [description]
     */
    dom.applyChanges = function() {
        // Never rerender when until batch complete
        if (batching > 0) {
            return;
        }

        api.dom.renderNodes();
    };

    /**
     * Attaches to the DOM element for rendering.
     *
     * @category DOM
     * @param {HTMLElement} target Element, selector, or jQuery-like object.
     * @return {void}
     */
    dom.attach = function(target) {
        $target = getElement(target);

        if (!$target) {
            throw new Error('No valid element to attach to.');
        }

        $target.className += ' inspire-tree';

        if (contextMenuChoices) {
            document.body.addEventListener('click', function() {
                dom.closeContextMenu();
            });
        }

        var dragTargetSelectors = get(api, 'config.dragTargets');
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
            document.addEventListener('mouseup', function() {
                if ($dragElement) {
                    $dragElement.parentNode.removeChild($dragElement);
                    document.removeEventListener('mousemove', mouseMoveListener);

                    if ($activeDropTarget && $activeDropTarget.inspireTree) {
                        $activeDropTarget.inspireTree.data.addNode(api.data.exportNode($dragNode));
                    }

                    api.events.emit('node.drop', $dragNode, $activeDropTarget);
                }

                if ($activeDropTarget) {
                    $activeDropTarget.className = $activeDropTarget.className.replace('drop-target', '');
                }

                $dragNode = null;
                $dragElement = null;
                $activeDropTarget = null;
            });
        }

        $target.inspireTree = api;
    };

    /**
     * Disable rendering in preparation for multiple changes.
     *
     * @category DOM
     * @return {void}
     */
    dom.batch = function() {
        batching++;
    };

    /**
     * Closes any open context menu.
     *
     * @category DOM
     * @return {void}
     */
    dom.closeContextMenu = function() {
        if (contextMenuNode) {
            contextMenuNode.parentNode.removeChild(contextMenuNode);
            contextMenuNode = null;
        }
    };

    /**
     * Expand immediate children for this node, if any.
     *
     * @category DOM
     * @param {object} node Node object.
     * @return {object} Node object.
     */
    dom.collapseNode = function(node) {
        if (!node.itree.state.collapsed && !isEmpty(get(node, 'children'))) {
            node.itree.state.collapsed = true;

            api.events.emit('node.collapsed', node);

            dom.markNodeDirty(node);
            dom.renderNodes();
        }

        return node;
    };

    /**
     * Permit rerendering of batched changes.
     *
     * @category DOM
     * @return {void}
     */
    dom.end = function() {
        batching--;

        if (batching === 0) {
            dom.applyChanges();
        }
    };

    /**
     * Expand immediate children for this node, if any.
     *
     * @category DOM
     * @param {object} node Node object.
     * @return {object} Node object.
     */
    dom.expandNode = function(node) {
        var allow = (!isEmpty(get(node, 'children')) || isDynamic);

        if (allow && node.itree.state.collapsed) {
            node.itree.state.collapsed = false;

            api.events.emit('node.expanded', node);

            if (isDynamic) {
                api.data.loadChildren(node);
            }
            else {
                dom.markNodeDirty(node);
                dom.renderNodes();
            }
        }

        return node;
    };

    /**
     * Hide a node.
     *
     * @category DOM
     * @param {object} node Node object.
     * @return {object} Node object.
     */
    dom.hideNode = function(node) {
        if (!node.itree.state.hidden) {
            node.itree.state.hidden = true;

            api.events.emit('node.hidden', node);

            // Update children
            if (get(node, 'children')) {
                dom.hideNodes(node.children);
            }

            dom.markNodeDirty(node);
            dom.renderNodes();
        }

        return node;
    };

    /**
     * Hide all nodes in an array.
     *
     * @category DOM
     * @param {array} nodes Array of node objects.
     * @return {array} Array of node objects.
     */
    dom.hideNodes = function(nodes) {
        dom.batch();
        each(nodes, dom.hideNode);
        dom.end();
        return nodes;
    };

    /**
     * Hides all nodes.
     *
     * @category DOM
     * @return {void}
     */
    dom.hideAll = function() {
        dom.hideNodes(api.data.getNodes());
    };

    /**
     * Mark a node as dirty, rebuilding this node in the virtual DOM
     * and rerendering to the live DOM, next time renderNodes is called.
     *
     * @param {object} startingNode Node object.
     * @return {void}
     */
    dom.markNodeDirty = function(startingNode) {
        api.data.recurseUp(startingNode, function(node) {
            node.itree.dirty = true;
        });
    };

    // Cache our root node, so we can patch re-render in the future.
    var rootNode;
    var ol;

    /**
     * Triggers rendering for the given node array.
     *
     * @category DOM
     * @param {array} nodes Array of node objects.
     * @return {void}
     */
    dom.renderNodes = function(nodes) {
        var newOl = createOrderedList(nodes || api.data.getNodes(), true);

        if (!rootNode) {
            rootNode = createElement(newOl);
            $target.appendChild(rootNode);

            api.events.emit('tree.ready');
        }
        else {
            var patches = diff(ol, newOl);
            rootNode = patch(rootNode, patches);
        }

        ol = newOl;
    };

    /**
     * Shows all nodes.
     *
     * @category DOM
     * @return {void}
     */
    dom.showAll = function() {
        dom.batch();
        api.data.recurseDown(api.data.getNodes(), dom.showNode);
        dom.end();
    };

    /**
     * Hide a node.
     *
     * @category DOM
     * @param {object} node Node object.
     * @return {object} Node object.
     */
    dom.showNode = function(node) {
        if (node.itree.state.hidden) {
            node.itree.state.hidden = false;

            api.events.emit('node.shown', node);

            dom.markNodeDirty(node);
            dom.renderNodes();
        }

        return node;
    };

    return dom;
};
