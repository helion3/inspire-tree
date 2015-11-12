'use strict';

module.exports = function(api) {
    // Define a wrapper we'll use for each node
    var TreeNode = function TreeNode() {};

    /**
     * Add a child to this node.
     *
     * @category TreeNode
     * @param {object} node Node object.
     * @return {object} Node object.
     */
    TreeNode.prototype.addChild = function(node) {
        return api.data.addChildNode(this, node);
    };

    /**
     * Get the immediate parent, if any.
     *
     * @category TreeNode
     * @return {object} Node object.
     */
    TreeNode.prototype.getParent = function() {
        return this.itree.parent;
    };

    /**
     * Collapse this node.
     *
     * @category TreeNode
     * @return {object} Node object.
     */
    TreeNode.prototype.collapse = function() {
        return api.dom.collapseNode(this);
    };

    /**
     * Deselect this node.
     *
     * @category TreeNode
     * @return {object} Node object.
     */
    TreeNode.prototype.deselect = function() {
        return api.data.deselectNode(this);
    };

    /**
     * Expand this node.
     *
     * @category TreeNode
     * @return {object} Node object.
     */
    TreeNode.prototype.expand = function() {
        return api.dom.expandNode(this);
    };

    /**
     * Hide this node.
     *
     * @category TreeNode
     * @return {object} Node object.
     */
    TreeNode.prototype.hide = function() {
        return api.dom.hideNode(this);
    };

    /**
     * Select this node.
     *
     * @category TreeNode
     * @return {object} Node object.
     */
    TreeNode.prototype.select = function() {
        return api.data.selectNode(this);
    };

    /**
     * Select this node.
     *
     * @category TreeNode
     * @param {string|number} property Property name.
     * @param {*} value New value.
     * @return {object} Node object.
     */
    TreeNode.prototype.set = function(property, value) {
        return api.data.setNodeProperty(this, property, value);
    };

    /**
     * Show this node.
     *
     * @category TreeNode
     * @return {object} Node object.
     */
    TreeNode.prototype.show = function() {
        return api.dom.showNode(this);
    };

    return TreeNode;
};
