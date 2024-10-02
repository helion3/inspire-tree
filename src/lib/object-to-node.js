import { assign, each, isArrayLike } from 'lodash';
import { collectionToModel } from './collection-to-model';
import TreeNode from '../treenode';
import { v4 as uuidV4 } from 'uuid';

/**
 * Parse a raw object into a TreeNode used within a tree.
 *
 * Note: Uses native js over lodash where performance
 * benefits most, since this handles every node.
 *
 * @private
 * @param {object} tree Tree instance.
 * @param {object} object Source object
 * @param {object} parent Pointer to parent object.
 * @return {object} Final object
 */
export function objectToNode(tree, object, parent) {
    // Create or type-ensure ID
    object.id = object.id || uuidV4();
    if (typeof object.id !== 'string' && typeof object.id !== 'number') {
        object.id = object.id.toString();
    }

    // High-performance default assignments
    const itree = object.itree = object.itree || {};
    itree.icon = itree.icon || false;
    itree.dirty = false;

    const li = itree.li = itree.li || {};
    li.attributes = li.attributes || {};

    const a = itree.a = itree.a || {};
    a.attributes = a.attributes || {};

    const state = itree.state = itree.state || {};

    // Enabled by default
    state.collapsed = typeof state.collapsed === 'boolean' ? state.collapsed : tree.defaultState.collapsed;
    state.selectable = typeof state.selectable === 'boolean' ? state.selectable : tree.defaultState.selectable;
    state.draggable = typeof state.draggable === 'boolean' ? state.draggable : tree.defaultState.draggable;
    state['drop-target'] = typeof state['drop-target'] === 'boolean' ? state['drop-target'] : tree.defaultState['drop-target'];

    // Disabled by default
    state.checked = typeof state.checked === 'boolean' ? state.checked : false;
    state.editable = typeof state.editable === 'boolean' ? state.editable : tree.defaultState.editable;
    state.editing = typeof state.editing === 'boolean' ? state.editing : tree.defaultState.editing;
    state.focused = state.focused || tree.defaultState.focused;
    state.hidden = state.hidden || tree.defaultState.hidden;
    state.indeterminate = state.indeterminate || tree.defaultState.indeterminate;
    state.loading = state.loading || tree.defaultState.loading;
    state.removed = state.removed || tree.defaultState.removed;
    state.rendered = state.rendered || tree.defaultState.rendered;
    state.selected = state.selected || tree.defaultState.selected;

    // Save parent, if any. This is unenumerable to prevent it showing in object.keys
    // and leading to recursive errors, like in third party deepEqual functions.
    Object.defineProperty(object.itree, 'parent', {
        value: parent,
        writable: true
    });

    // Wrap
    object = assign(new TreeNode(tree), object);

    if (isArrayLike(object.children)) {
        object.children = collectionToModel(tree, object.children, object);
    }

    // Fire events for pre-set states, if enabled
    if (tree.allowsLoadEvents) {
        each(tree.config.allowLoadEvents, eventName => {
            if (state[eventName]) {
                tree.emit('node.' + eventName, object, true);
            }
        });
    }

    return object;
}
