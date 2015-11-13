'use strict';

/**
 * An Array-like collection of TreeNodes.
 *
 * @return {TreeNodes} Collection of TreeNode
 */
function TreeNodes() {}
TreeNodes.prototype = Object.create(Array.prototype);

module.exports = TreeNodes;
