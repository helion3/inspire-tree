'use strict';

import * as _ from 'lodash';
import { objectToNode } from './object-to-node';
import { TreeNodes } from '../treenodes';

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
    let collection = new TreeNodes(tree);

    // Sort
    if (tree.config.sort) {
        array = _.sortBy(array, tree.config.sort);
    }

    _.each(array, (node) => {
        collection.push(objectToNode(tree, node, parent));
    });

    collection._context = parent;

    return collection;
}
