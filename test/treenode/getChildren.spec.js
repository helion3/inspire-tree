'use strict';

describe('TreeNode.prototype.getChildren', function() {
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
        expect(tree.node(1).getChildren).to.be.a('function');
    });

    it('returns children for parent node', function() {
        expect(tree.node(1).getChildren()).to.have.length(1);
    });

    it('returns empty collection for child node', function() {
        expect(tree.node(2).getChildren()).to.have.length(0);
    });

    after(helpers.clearDOM);
});
