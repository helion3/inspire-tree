var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.addNode', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            sort: 'text',
            data: [{
                text: 'B',
                id: 1,
                children: []
            }]
        });
    });

    it('exists', function() {
        expect(tree.addNode).to.be.a('function');
    });

    it('adds a new node', function() {
        expect(tree.nodes()).to.have.length(1);

        tree.addNode({ text: 'C' });

        expect(tree.nodes()).to.have.length(2);
    });

    it('sorts new nodes', function() {
        tree.addNode({ text: 'A' });

        expect(tree.get(0).text).to.equal('A');
        expect(tree.get(2).text).to.equal('C');
    });
});
