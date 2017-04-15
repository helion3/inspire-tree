var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.show', function() {
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
        expect(tree.node(1).show).to.be.a('function');
    });

    it('shows node', function() {
        var node = tree.node(1);
        node.hide();
        expect(node.hidden()).to.be.true;

        node.show();
        expect(node.hidden()).to.be.false;
    });
});
