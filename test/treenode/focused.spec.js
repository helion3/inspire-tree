var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.focused', function() {
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
        expect(tree.node(1).focused).to.be.a('function');
    });

    it('returns false when not focused', function() {
        expect(tree.node(1).focused()).to.be.false;
    });

    it('returns true when focused', function() {
        var node = tree.node(1);

        node.focus();
        expect(node.focused()).to.be.true;
    });
});
