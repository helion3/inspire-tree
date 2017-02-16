'use strict';

describe('Tree.isTreeNodes', function() {
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Create tree
        tree = new InspireTree({
            target: $('.tree'),
            data: []
        });
    });

    it('exists', function() {
        expect(tree.isTreeNodes).to.be.a('function');
    });

    it('returns false an array', function() {
        expect(tree.isTreeNodes([])).to.be.false;
    });

    it('returns true for a node array', function() {
        expect(tree.isTreeNodes(tree.nodes())).to.be.true;
    });

    after(helpers.clearDOM);
});
