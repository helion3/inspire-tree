'use strict';

describe('Tree.getFocusedNode', function() {
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
        expect(tree.getFocusedNode).to.be.a('function');
    });

    it('returns null when nothing focused', function() {
        expect(tree.getFocusedNode()).to.be.undefined;
    });

    it('returns select root node', function() {
        tree.getNode(1).select();

        expect(tree.getFocusedNode().id).to.equal('1');
    });

    after(helpers.clearDOM);
});
