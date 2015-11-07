'use strict';

// Libs
var createElement = require('virtual-dom/create-element');
var h = require('virtual-dom/h');
var transform = require('lodash.transform');

module.exports = function InspireDOM() {
    var $target;

    /**
     * Creates a list item node for a specific data node.
     *
     * @param {object} node Data node.
     * @return {object} List Item node.
     */
    var createListItemNode = function(node) {
        return h('li', [String(node.title)]);
    };

    /**
     * Creates list item nodes for an array of data nodes.
     *
     * @param {array} nodes Data nodes.
     * @return {array} Array of List Item nodes.
     */
    var createListItemNodes = function(nodes) {
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
    var createOrderedList = function(nodes) {
        return h('ol', createListItemNodes(nodes));
    };

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
            }
            else {
                reject(new Error('Invalid selector - no match found.'));
            }
        });
    };

    // Cache our root node, so we can patch re-render in the future.
    var rootNode;

    dom.renderNodes = function(nodes) {
        var ol = createOrderedList(nodes);

        if (!rootNode) {
            rootNode = createElement(ol);
        }

        $target.appendChild(rootNode);
    };

    return dom;
};
