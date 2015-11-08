'use strict';

// Libs
var createElement = require('virtual-dom/create-element');
var diff = require('virtual-dom/diff');
var filter = require('lodash.filter');
var h = require('virtual-dom/h');
var isEmpty = require('lodash.isempty');
var isObject = require('lodash.isobject');
var isString = require('lodash.isstring');
var pairs = require('lodash.pairs');
var patch = require('virtual-dom/patch');
var transform = require('lodash.transform');

module.exports = function InspireDOM(api) {
    var $target;

    /**
     * Creates a list item node for a specific data node.
     *
     * @param {object} node Data node.
     * @return {object} List Item node.
     */
    function createListItemNode(node) {
        var contents = [createTitleContainer(node)];

        if (!isEmpty(node.children)) {
            contents.push(createOrderedList(node.children));
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
            onclick: function(event) {
                var uid = event.target.parentNode.parentNode.getAttribute('data-uid');
                var node = api.data.getNodeById(uid);

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
                var uid = event.target.parentNode.parentNode.getAttribute('data-uid');
                var node = api.data.getNodeById(uid);

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

        var l = node.children ? node.children.length : 0;
        var hiddenCount = filter(node.children, 'itree.state.hidden', true).length;
        var hasVisibleChildren = (l > 0 && hiddenCount < l);

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
