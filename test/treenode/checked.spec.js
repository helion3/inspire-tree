var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.checked', function() {
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
        expect(tree.node(1).checked).to.be.a('function');
    });

    it('returns the checked state of the node', function() {
        var node = tree.node(1);
        expect(node.checked()).to.be.false;

        node.check();
        expect(node.checked()).to.be.true;
    });
});
