'use strict';

describe('Tree.focused', function() {
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
        expect(tree.focused).to.be.a('function');
    });

    it('returns null when nothing focused', function() {
        expect(tree.focused()).to.have.length(0);
    });

    it('returns focused node', function() {
        tree.node(1).focus();

        expect(tree.focused()[0].id).to.equal('1');
    });

    after(helpers.clearDOM);
});
