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
        expect(tree.nodes().toArray).to.be.a('function');
        expect(tree.toArray).to.be.a('function');
    });

    it('returns nodes as a native array', function() {
        var nodes = tree.nodes().toArray();

        expect(Array.isArray(nodes)).to.be.true;
        expect(nodes).to.have.length(1);
    });

    it('returns array of native objects', function() {
        var nodes = tree.nodes().toArray();

        expect(nodes[0].constructor.name).to.equal('Object');
    });

    after(helpers.clearDOM);
});
