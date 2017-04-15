var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.set', function() {
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
        expect(tree.node(1).set).to.be.a('function');
    });

    it('updates node property', function() {
        var node = tree.node(1);
        expect(node.itree.dirty).to.be.false;
        expect(node.text).to.equal('A');

        node.set('text', 'New');
        expect(node.itree.dirty).to.be.true;
        expect(node.text).to.equal('New');
    });
});
