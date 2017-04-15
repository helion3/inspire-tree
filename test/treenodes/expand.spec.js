var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.expand', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'AA'
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().expand).to.be.a('function');
        expect(tree.expand).to.be.a('function');
    });

    it('expands a node', function() {
        var node = tree.node(1);
        expect(node.expanded()).to.be.false;

        tree.expand();
        expect(node.expanded()).to.be.true;
    });
});
