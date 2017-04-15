var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.collapseDeep', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                children: [{
                    text: 'B',
                    id: 2,
                    children: [{
                        text: 'C'
                    }]
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().collapseDeep).to.be.a('function');
        expect(tree.collapseDeep).to.be.a('function');
    });

    it('collapses all nodes', function() {
        var node = tree.node(2);
        node.expand();
        expect(node.expanded()).to.be.true;

        tree.collapseDeep();
        expect(node.expanded()).to.be.false;
    });
});
