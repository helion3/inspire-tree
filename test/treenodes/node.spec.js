var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.node', function() {
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
        expect(tree.nodes().node).to.be.a('function');
        expect(tree.node).to.be.a('function');
    });

    it('returns a node', function() {
        expect(tree.node(1).id).to.equal('1');
    });
});
