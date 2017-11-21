var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.remove', function() {
    var tree;

    beforeEach(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).remove).to.be.a('function');
    });

    it('removes a node', function() {
        tree.node(1).remove();

        expect(tree.nodes()).to.have.length(0);
    });

    it('removes a node while retaining state', function() {
        var node = tree.node(1);
        node.select();

        expect(node.selected()).to.be.true;

        var exported = node.remove(true);

        expect(exported.itree).to.be.an('object');
        expect(exported.itree.state).to.be.an('object');
        expect(exported.itree.state.selected).to.be.true;
    });
});
