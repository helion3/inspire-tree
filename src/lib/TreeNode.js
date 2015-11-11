'use strict';

module.exports = function(api) {
    // Define a wrapper we'll use for each node
    var TreeNode = function TreeNode() {};

    /**
     * Add a child to this node.
     *
     * @param {object} node Node object.
     * @return {object} Node object.
     */
    TreeNode.prototype.addChild = function(node) {
        return api.data.addChildNode(this, node);
    };

    /**
     * Get the immediate parent, if any.
     *
     * @return {object} Node object.
     */
    TreeNode.prototype.getParent = function() {
        return this.itree.parent;
    };

    /**
     * Collapse this node.
     *
     * @return {object} Node object.
     */
    TreeNode.prototype.collapse = function() {
        return api.data.collapseNode(this);
    };

    /**
     * Deselect this node.
     *
     * @return {object} Node object.
     */
    TreeNode.prototype.deselect = function() {
        return api.data.deselectNode(this);
    };

    /**
     * Expand this node.
     *
     * @return {object} Node object.
     */
    TreeNode.prototype.expand = function() {
        return api.data.expandNode(this);
    };

    /**
     * Hide this node.
     *
     * @return {object} Node object.
     */
    TreeNode.prototype.hide = function() {
        return api.data.hideNode(this);
    };

    /**
     * Select this node.
     *
     * @return {object} Node object.
     */
    TreeNode.prototype.select = function() {
        return api.data.selectNode(this);
    };

    /**
     * Show this node.
     *
     * @return {object} Node object.
     */
    TreeNode.prototype.show = function() {
        return api.data.showNode(this);
    };

    return TreeNode;
};
