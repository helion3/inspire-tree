var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.deselect', function() {
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
        expect(tree.node(1).deselect).to.be.a('function');
    });

    it('deselects', function() {
        var node = tree.node(1);
        node.select();

        expect(node.selected()).to.be.true;

        node.deselect();
        expect(node.selected()).to.be.false;
    });
});
