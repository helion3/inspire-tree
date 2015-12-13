'use strict';

describe('TreeNodes.prototype.toArray', function() {
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
        expect(tree.getNodes().toArray).to.be.a('function');
    });

    it('returns nodes as a native array', function() {
        var nodes = tree.getNodes().toArray();

        expect(Array.isArray(nodes)).to.be.true;
        expect(nodes).to.have.length(1);
    });

    after(helpers.clearDOM);
});
