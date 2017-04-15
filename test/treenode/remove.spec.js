var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.remove', function() {
    var tree;

    before(function() {
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
});
