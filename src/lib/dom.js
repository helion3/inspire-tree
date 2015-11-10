'use strict';

// Libs
var createElement = require('virtual-dom/create-element');
var diff = require('virtual-dom/diff');
var filter = require('lodash.filter');
var get = require('lodash.get');
var h = require('virtual-dom/h');
var isArray = require('lodash.isarray');
var isEmpty = require('lodash.isempty');
var isObject = require('lodash.isobject');
var isString = require('lodash.isstring');
var pairs = require('lodash.pairs');
var patch = require('virtual-dom/patch');
var transform = require('lodash.transform');

module.exports = function InspireDOM(api) {
    var $target;

    /**
     * Creates a context menu unordered list.
     *
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
     * Creates a list item node when a dynamic node returns no children.
     *
     * Cannot be clicked or expanded.
     *
     * @return {object} List Item node.
     */
    function createEmptyListItemNode() {
        return h('ol', [
            h('li', [
                h('span.title.icon.icon-file-empty.empty', ['No Results'])
            ])
        ]);
    };

    /**
     * Creates a list item node for a specific data node.
     *
     * @param {object} node Data node.
     * @return {object} List Item node.
     */
    function createListItemNode(node) {
        var contents = [
            h('div.wholerow'),
            createTitleContainer(node)
        ];

        if (!isEmpty(node.children)) {
            contents.push(createOrderedList(node.children));
        }
        else if (get(api, 'config.dynamic') && isArray(node.children)) {
            contents.push(createEmptyListItemNode());
        }

        // Add classes for any enabled states
        var classNames = transform(pairs(node.itree.state), function(keys, value) {
            if (value[1]) {
                keys.push(value[0]);
            }
        }).join('.');

        if (classNames.length) {
            classNames = '.' + classNames;
        }

        return h('li' + classNames, { attributes: { 'data-uid': node.id } }, contents);
    };

    /**
     * Creates list item nodes for an array of data nodes.
     *
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
     * @param {array} nodes Data nodes.
     * @return {object} Oredered List node.
     */
    function createOrderedList(nodes) {
        return h('ol', createListItemNodes(nodes));
    };

    /**
     * Creates an anchor around the node title.
     *
     * @param {object} node Node object.
     * @param {boolean} hasVisibleChildren If this node has visible children.
     * @return {object} Anchor node.
     */
    function createTitleAnchor(node, hasVisibleChildren) {
        var classNames = ['title', 'icon'];

        classNames.push(node.iconClass || (!hasVisibleChildren ? 'icon-file-empty' : 'icon-folder'));

        return h('a.' + classNames.join('.'), {
            oncontextmenu: function(event) {
                if (get(api, 'config.contextMenu')) {
                    var node = getNodeFromTitleDOMElement(event.target);

                    renderContextMenu(event, node);

                    // Emit
                    api.events.emit('node.contextmenu', event, node);
                }
            },
            onclick: function(event) {
                var node = getNodeFromTitleDOMElement(event.target);

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
                    api.data.expandNode(node);
                }
                else {
                    api.data.collapseNode(node);
                }

                // Emit
                api.events.emit('node.dblclick', event, node);
            }
        }, [node.title]);
    }

    /**
     * Creates a container element for the title/toggle/icons.
     *
     * @param {string} node Node object.
     * @return {object} Container node.
     */
    function createTitleContainer(node) {
        var contents = [];

        var hasVisibleChildren = true;
        if (!get(api, 'config.dynamic')) {
            var l = node.children ? node.children.length : 0;
            var hiddenCount = filter(node.children, 'itree.state.hidden', true).length;
            hasVisibleChildren = (l > 0 && hiddenCount < l);
        }

        if (hasVisibleChildren) {
            contents.push(createToggleAnchor(node));
        }

        contents.push(createTitleAnchor(node, hasVisibleChildren));

        return h('div', contents);
    };

    /**
     * Creates an anchor used for expanding and collapsing a node.
     *
     * @param {object} node Node object.
     * @return {object} Anchor node.
     */
    function createToggleAnchor(node) {
        var caret = (node.itree.state.collapsed ? '.icon-caret' : '.icon-caret-down');

        return h('a.toggle.icon' + caret, { onclick: function(event) {
            var uid = event.target.parentNode.parentNode.getAttribute('data-uid');
            var node = api.data.getNodeById(uid);

            // Toggle selected state
            if (node.itree.state.collapsed) {
                api.data.expandNode(node);
            }
            else {
                api.data.collapseNode(node);
            }
        } });
    }

    /**
     * Helper method for obtaining the data-uid from a DOM element.
     *
     * @param {HTMLElement} element HTML Element.
     * @return {object} Node object
     */
    function getNodeFromTitleDOMElement(element) {
        var uid = element.parentNode.parentNode.getAttribute('data-uid');
        return api.data.getNodeById(uid);
    }

    var contextMenuNode;

    /**
     * Renders a context menu for a given contextmenu click and node.
     *
     * @param {object} event Click event.
     * @param {object} node Clicked node object.
     * @return {void}
     */
    function renderContextMenu(event, node) {
        var choices = get(api, 'config.contextMenu');

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

    /**
     * Attaches to the DOM element for rendering.
     *
     * @param {HTMLElement} target Element, selector, or jQuery-like object.
     * @return {void}
     */
    dom.attach = function(target) {
        if (target instanceof HTMLElement) {
            $target = target;
        }
        else if (isObject(target) && isObject(target[0])) {
            $target = target[0];
        }
        else if (isString(target)) {
            var match = document.querySelector(target);
            if (match) {
                $target = match;
            }
        }

        if (!$target) {
            throw new Error('No valid element to attach to.');
        }

        $target.className += ' inspire-tree';

        if (get(api, 'config.contextMenu')) {
            document.body.addEventListener('click', function() {
                dom.closeContextMenu();
            });
        }
    };

    /**
     * Closes any open context menu.
     *
     * @return {void}
     */
    dom.closeContextMenu = function() {
        if (contextMenuNode) {
            contextMenuNode.parentNode.removeChild(contextMenuNode);
            contextMenuNode = null;
        }
    };

    // Cache our root node, so we can patch re-render in the future.
    var rootNode;
    var ol;

    dom.renderNodes = function(nodes) {
        var newOl = createOrderedList(nodes, true);

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

    return dom;
};
