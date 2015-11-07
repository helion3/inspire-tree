'use strict';

// Libs
var createElement = require('virtual-dom/create-element');
var h = require('virtual-dom/h');
var isArray = require('lodash.isarray');
var isEmpty = require('lodash.isempty');
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
        var contents = [
            createToggleAnchor(),
            createTitleAnchor(node.title)
        ];

        if (isArray(node.children) && !isEmpty(node.children)) {
            contents.push(createOrderedList(node.children));
        }

        return h('li', { attributes: { 'data-uid': node.id } }, contents);
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
     * @param {string} text Title
     * @return {object} Anchor node.
     */
    function createTitleAnchor(text) {
        return h('a', { onclick: function(event) {
            var uid = event.target.parentNode.getAttribute('data-uid');
            var node = api.data.getNodeById(uid);

            // Emit
            api.events.emit('node.click', event, node);
        } }, [text]);
    }

    /**
     * Creates an anchor used for expanding and collapsing a node.
     *
     * @return {object} Anchor node.
     */
    function createToggleAnchor() {
        return h('a.toggle.icon.icon-caret', { onclick: function(event) {
            events.emit('node.toggled', event);
        } });
    }

    var dom = this;

    /**
     * Queries the DOM to link with our target element.
     *
     * @param {string} selector Query selector.
     * @return {object} Promise
     */
    dom.linkTarget = function(selector) {
        return new Promise(function(resolve, reject) {
            var match = document.querySelector(selector);
            if (match) {
                resolve(match);
                $target = match;
                $target.className += ' inspire-tree';
            }
            else {
                reject(new Error('Invalid selector - no match found.'));
            }
        });
    };

    // Cache our root node, so we can patch re-render in the future.
    var rootNode;

    dom.renderNodes = function(nodes) {
        var ol = createOrderedList(nodes, true);

        if (!rootNode) {
            rootNode = createElement(ol);
        }

        $target.appendChild(rootNode);
    };

    return dom;
};
