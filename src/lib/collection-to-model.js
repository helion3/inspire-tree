import { each, sortBy } from 'lodash';
import { objectToNode } from './object-to-node';
import TreeNodes from '../treenodes';

/**
 * Parses a raw collection of objects into a model used
 * within a tree. Adds state and other internal properties.
 *
 * @private
 * @param {object} tree Tree instance.
 * @param {array} array Array of nodes
 * @param {object} parent Pointer to parent object
 * @return {array|object} Object model.
 */
export function collectionToModel(tree, array, parent) {
    const collection = new TreeNodes(tree, null, {
        calculateRenderablePositions: true
    });

    collection.batch();

    // Sort
    if (tree.config.sort) {
        array = sortBy(array, tree.config.sort);
    }

    each(array, node => {
        collection.push(objectToNode(tree, node, parent));
    });

    // Save parent, if any. This is unenumerable to prevent it showing in object.keys
    // and leading to recursive errors, like in third party deepEqual functions.
    Object.defineProperty(collection, '_context', {
        value: parent,
        writable: true
    });

    collection.end();

    return collection;
}
