'use strict';

describe('Tree.isNode', function() {
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Create tree
        tree = new InspireTree({
            target: $('.tree'),
            data: [{
                text: 'A',
                id: 1
            }]
        });
    });

    it('exists', function() {
        expect(tree.isNode).to.be.a('function');
    });

    it('returns false a node-like object', function() {
        expect(tree.isNode({ text: 'A' })).to.be.false;
    });

    it('returns true for a node', function() {
        expect(tree.isNode(tree.node(1))).to.be.true;
    });

    after(helpers.clearDOM);
});
