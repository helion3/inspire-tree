'use strict';

describe('TreeNode.prototype.collapsed', function() {
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
                    text: 'AA'
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.getNode(1).collapsed).to.be.a('function');
    });

    it('returns true when collapsed', function() {
        expect(tree.getNode(1).collapsed()).to.be.true;
    });

    it('returns false when expanded', function() {
        var node = tree.getNode(1);
        node.expand();

        expect(node.collapsed()).to.be.false;
    });

    after(helpers.clearDOM);
});
