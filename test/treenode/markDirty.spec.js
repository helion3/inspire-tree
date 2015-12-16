'use strict';

describe('TreeNode.prototype.markDirty', function() {
    var $tree;
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Query DOM
        $tree = $('.tree');

        // Create tree
        tree = new InspireTree({
            target: $tree,
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

    after(helpers.clearDOM);
});
