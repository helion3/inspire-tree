'use strict';

/**
 * Accepts and holds a reference to a final DOM element.
 *
 * @private
 * @category DOM
 * @return {object} Object holding the final node.
 */
export class DOMReference {
    hook(node) {
        this.node = node;
    }
}
