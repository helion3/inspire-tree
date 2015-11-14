'use strict';

describe('TreeNode.prototype.selectFirstVisibleNode', function() {
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
            }, {
                text: 'B',
                id: 2
            }]
        });
    });

    it('exists', function() {
        expect(tree.selectFirstVisibleNode).to.be.a('function');
    });

    it('selects the first visible node', function() {
        tree.getNode(1).hide();
        tree.selectFirstVisibleNode();

        expect(tree.getNode(2).selected()).to.be.true;
    });

    after(helpers.clearDOM);
});
