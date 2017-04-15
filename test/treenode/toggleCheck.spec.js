var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.toggleCheck', function() {
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

    var node;

    it('exists', function() {
        node = tree.node(1);
        expect(node.toggleCheck).to.be.a('function');
    });

    it('selects node', function() {
        node.toggleCheck();

        expect(node.checked()).to.be.true;
    });

    it('deselects node', function() {
        node.toggleCheck();

        expect(node.checked()).to.be.false;
    });
});
