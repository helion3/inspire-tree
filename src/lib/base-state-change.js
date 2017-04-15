import * as _ from 'lodash';

/**
 * Reset a node's state to the tree default.
 *
 * @private
 * @param {TreeNode} node Node object.
 * @returns {TreeNode} Node object.
 */
function resetState(node) {
    _.each(node._tree.defaultState, (val, prop) => {
        node.state(prop, val);
    });

    return node;
}


/**
 * Stores repetitive state change logic for most state methods.
 *
 * @private
 * @param {string} prop State property name.
 * @param {boolean} value New state value.
 * @param {string} verb Verb used for events.
 * @param {TreeNode} node Node object.
 * @param {string} deep Optional name of state method to call recursively.
 * @return {TreeNode} Node object.
 */
export function baseStateChange(prop, value, verb, node, deep) {
    if (node.state(prop) !== value) {
        node._tree.batch();

        if (node._tree.config.nodes.resetStateOnRestore && verb === 'restored') {
            resetState(node);
        }

        node.state(prop, value);

        node._tree.emit('node.' + verb, node);

        if (deep && node.hasChildren()) {
            node.children.recurseDown((child) => {
                baseStateChange(prop, value, verb, child);
            });
        }

        node.markDirty();
        node._tree.end();
    }

    return node;
};
