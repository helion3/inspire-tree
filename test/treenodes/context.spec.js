var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.context', function() {
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
        expect(tree.nodes().context).to.be.a('function');
    });

    it('returns the tree as the root context', function() {
        expect(tree.nodes().context()).to.equal(tree);
    });

    it('returns parent node for a child context', function() {
        var node = tree.node(1);

        expect(node.getChildren().context()).to.equal(node);
    });
});
