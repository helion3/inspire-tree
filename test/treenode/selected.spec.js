var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.selected', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).selected).to.be.a('function');
    });

    it('returns false when not selected', function() {
        expect(tree.node(1).selected()).to.be.false;
    });

    it('returns true when selected', function() {
        var node = tree.node(1);
        node.select();

        expect(node.selected()).to.be.true;
    });
});
