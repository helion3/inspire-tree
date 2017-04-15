var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.showDeep', function() {
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
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().showDeep).to.be.a('function');
        expect(tree.showDeep).to.be.a('function');
    });

    it('shows all nodes', function() {
        tree.hideDeep();

        var nodeA = tree.node(1);
        var nodeB = tree.node(2);

        expect(nodeA.hidden()).to.be.true;
        expect(nodeB.hidden()).to.be.true;

        tree.showDeep();
        expect(nodeA.hidden()).to.be.false;
        expect(nodeB.hidden()).to.be.false;
    });
});
