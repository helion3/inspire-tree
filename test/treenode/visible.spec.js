var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.visible', function() {
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
        expect(tree.node(1).visible).to.be.a('function');
    });

    it('returns true when visible', function() {
        expect(tree.node(1).visible()).to.be.true;
    });

    it('returns false when hidden', function() {
        var node = tree.node(1);
        node.hide();

        expect(node.visible()).to.be.false;
    });
});
