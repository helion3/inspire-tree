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
     * Collapse this node.
     *
     * @category TreeNode
     * @return {object} Node object.
     */
    TreeNode.prototype.collapse = function() {
        return api.dom.collapseNode(this);
    };

    /**
     * Get if node collapsed.
     *
     * @category TreeNode
     * @return {boolean} If collapsed.
     */
    TreeNode.prototype.collapsed = function() {
        return this.itree.state.collapsed;
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
     * Get if node expanded.
     *
     * @category TreeNode
     * @return {boolean} If expanded.
     */
    TreeNode.prototype.expanded = function() {
        return !this.itree.state.collapsed;
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
     * Get if node hidden.
     *
     * @category TreeNode
     * @return {boolean} If hidden.
     */
    TreeNode.prototype.hidden = function() {
        return this.itree.state.hidden;
    };

    /**
     * Expand parent nodes.
     *
     * @category TreeNode
     * @return {void}
     */
    TreeNode.prototype.expandParents = function() {
        return api.dom.expandParents(this);
    };

    /**
     * If node has a parent.
     *
     * @category TreeNode
     * @return {boolean} If parent.
     */
    TreeNode.prototype.hasParent = function() {
        return Boolean(this.itree.parent);
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
     * Get if node selected.
     *
     * @category TreeNode
     * @return {boolean} If selected.
     */
    TreeNode.prototype.selected = function() {
        return this.itree.state.selected;
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
