'use strict';

describe('TreeNode.prototype.hasParent', function() {
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
        expect(tree.node(1).hasParent).to.be.a('function');
    });

    it('returns false for root node', function() {
        expect(tree.node(1).hasParent()).to.be.false;
    });

    it('returns true for child node', function() {
        expect(tree.node(2).hasParent()).to.be.true;
    });

    after(helpers.clearDOM);
});
