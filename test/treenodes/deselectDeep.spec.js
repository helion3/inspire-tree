var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.deselectDeep', function() {
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
        expect(tree.nodes().deselect).to.be.a('function');
        expect(tree.deselect).to.be.a('function');
    });

    it('deselects all nodes', function() {
        var node = tree.node(2);
        node.select();
        expect(node.selected()).to.be.true;

        tree.deselectDeep();
        expect(node.selected()).to.be.false;
    });
});
