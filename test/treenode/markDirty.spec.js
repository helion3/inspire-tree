var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.markDirty', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'AA',
                    id: 2
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).markDirty).to.be.a('function');
    });

    it('marks node dirty', function() {
        var node = tree.node(2);
        expect(node.itree.dirty).to.be.false;

        node.markDirty();
        expect(node.itree.dirty).to.be.true;
    });

    it('marks parent nodes dirty', function() {
        expect(tree.node(2).getParent().itree.dirty).to.be.true;
    });
});
