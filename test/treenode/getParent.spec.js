'use strict';

describe('TreeNode.prototype.getParent', function() {
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
        expect(tree.node(1).getParent).to.be.a('function');
    });

    it('returns undefined for root node', function() {
        expect(tree.node(1).getParent()).to.be.undefined;
    });

    it('returns parent for child node', function() {
        expect(tree.node(2).getParent().id).to.equal('1');
    });

    after(helpers.clearDOM);
});
