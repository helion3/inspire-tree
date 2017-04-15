'use strict';

import * as _ from 'lodash';
import { TreeNode } from '../treenode';
import { TreeNodes } from '../treenodes';

/**
 * Base recursion function for a collection or node.
 *
 * Returns false if execution should cease.
 *
 * @private
 * @param {TreeNode|TreeNodes} obj Node or collection.
 * @param {function} iteratee Iteratee function
 * @return {boolean} Cease iteration.
 */
export function recurseDown(obj, iteratee) {
    let res;

    if (obj instanceof TreeNodes) {
        _.each(obj, (node) => {
            res = recurseDown(node, iteratee);

            return res;
        });
    }
    else if (obj instanceof TreeNode) {
        res = iteratee(obj);

        // Recurse children
        if (res !== false && obj.hasChildren()) {
            res = recurseDown(obj.children, iteratee);
        }
    }

    return res;
}
