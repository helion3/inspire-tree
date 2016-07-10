'use strict';

/**
 * Accepts and holds a reference to a final DOM element.
 *
 * @private
 * @category DOM
 * @return {object} Object holding the final node.
 */
function DOMReference() {};
DOMReference.prototype.hook = function(node) {
    this.node = node;
};

module.exports = DOMReference;
