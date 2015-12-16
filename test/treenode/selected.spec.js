'use strict';

describe('TreeNode.prototype.selected', function() {
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

    after(helpers.clearDOM);
});
