const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

// Based on react-hook-form's isObject https://github.com/react-hook-form/react-hook-form/blob/b5863b46346416972c025f4b621cb624ffc4a955/src/utils/isObject.ts
const isObjectType = value =>
    typeof value === 'object';

const isObject = value =>
    value !== null &&
    // eslint-disable-next-line no-undefined
    value !== undefined &&
    !Array.isArray(value) &&
    isObjectType(value);

// Based on react-hook-form's deepEqual
// https://github.com/react-hook-form/react-hook-form/blob/b5863b46346416972c025f4b621cb624ffc4a955/src/utils/deepEqual.ts#L6
function deepEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      const val1 = object1[key];

      if (!keys2.includes(key)) {
        return false;
      }

      if (key !== 'ref') {
        const val2 = object2[key];

        if (
            (isObject(val1) && isObject(val2)) ||
          (Array.isArray(val1) && Array.isArray(val2)) ?
            !deepEqual(val1, val2) :
            val1 !== val2
        ) {
          return false;
        }
      }
    }

    return true;
  }


describe('deepEqual recursion errors', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    id: 11,
                    text: 'AA'
                }]
            }]
        });
    });

    it('tree node recursive keys exist but are not enumerable', function() {
        // We call clone to ensure the TreeNode constructor gets called, which sets node._tree
        expect(tree.node(11).clone()._tree).to.exist;
        expect(Object.keys(tree.node(11).clone()).includes('_tree')).to.equal(false);

        expect(tree.node(11).itree.parent).to.exist;
        expect(Object.keys(tree.node(11).itree).includes('parent')).to.equal(false);

        expect(tree.node(1).children._context).to.exist;
        expect(Object.keys(tree.node(1).children).includes('_context')).to.equal(false);
    });

    it('does not cause recursion errors with a tree node in deepEqual-type functions', function() {
        expect(deepEqual(tree.node(1), tree.node(1))).to.equal(true);
        expect(deepEqual(tree.node(1), tree.node(11))).to.equal(false);
    });

    it('does not cause recursion errors with tree nodes in deepEqual-type functions', function() {
        expect(deepEqual(tree.nodes(), tree.nodes())).to.equal(true);
        expect(deepEqual(tree.node(1).children, tree.nodes())).to.equal(false);
    });
});
