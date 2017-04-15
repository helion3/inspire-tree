var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.select', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1
            }, {
                text: 'B',
                id: 2
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).select).to.be.a('function');
    });

    it('deselects other nodes on node change', function() {
        tree.node(2).select();

        expect(tree.node(1).selected()).to.be.false;
    });

    it('select via api', function() {
        var node = tree.node(1);
        expect(node.selected()).to.be.false;

        node.select();
        expect(node.selected()).to.be.true;
    });
});
