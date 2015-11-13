'use strict';

var each = require('lodash.foreach');

module.exports = function() {
    var $super = Object.create(Array.prototype);

    /**
     * An Array-like collection of TreeNodes.
     *
     * @category TreeNodes
     * @return {TreeNodes} Collection of TreeNode
     */
    var TreeNodes = function TreeNodes() {};
    TreeNodes.prototype = $super;
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

    // Define methods we pass through to individual TreeNode objects
    var mapped = ['hide'];

    each(mapped, function(method) {
        TreeNodes.prototype[method] = function() {
            each(this, function(node) {
                node[method]();
            });
        };
    });

    return TreeNodes;
};
