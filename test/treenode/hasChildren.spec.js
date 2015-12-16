'use strict';

describe('TreeNode.prototype.hasChildren', function() {
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
        expect(tree.node(1).hasChildren).to.be.a('function');
    });

    it('returns true for parent node', function() {
        expect(tree.node(1).hasChildren()).to.be.true;
    });

    it('returns false for child node', function() {
        expect(tree.node(2).hasChildren()).to.be.false;
    });

    after(helpers.clearDOM);
});
