var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.toArray', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
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
});
