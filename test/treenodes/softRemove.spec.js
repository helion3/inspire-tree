var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.softRemove', function() {
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
        expect(tree.nodes().softRemove).to.be.a('function');
        expect(tree.softRemove).to.be.a('function');
    });

    it('soft-removes a node', function() {
        var node = tree.node(1);
        expect(node.removed()).to.be.false;

        node.softRemove();

        expect(tree.nodes()).to.have.length(1);
        expect(node.removed()).to.be.true;
    });
});
