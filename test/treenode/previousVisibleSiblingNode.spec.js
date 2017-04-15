var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.previousVisibleSiblingNode', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1
            }, {
                text: 'B',
                id: 2
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).previousVisibleSiblingNode).to.be.a('function');
    });

    it('returns first node', function() {
        expect(tree.node(2).previousVisibleSiblingNode().id).to.equal('1');
    });

    it('returns undefined when first node hidden', function() {
        tree.node(1).hide();
        expect(tree.node(2).previousVisibleSiblingNode()).to.be.undefined;
    });
});
