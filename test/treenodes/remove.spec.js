var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.remove', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'B',
                    id: 2
                }]
            }, {
                text: 'C'
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().remove).to.be.a('function');
        expect(tree.remove).to.be.a('function');
    });

    it('removes a node', function() {
        var node = tree.node(1);

        expect(node.hasChildren()).to.be.true;

        node.children.remove(tree.node(2));

        expect(node.hasChildren()).to.be.false;
    });
});
