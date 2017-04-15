var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.expandParents', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'AA',
                    id: 2
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().expandParents).to.be.a('function');
    });

    it('returns a promise', function() {
        var node = tree.node(1);
        expect(node.expanded()).to.be.false;

        node.getChildren().expandParents();
        expect(node.expanded()).to.be.true;
    });
});
