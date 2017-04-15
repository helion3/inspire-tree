var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.focus', function() {
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
        expect(tree.node(1).focus).to.be.a('function');
    });

    it('focuses a node', function() {
        var node = tree.node(1);
        node.focus();

        expect(node.focused()).to.be.true;
    });

    it('blurs other nodes on node change', function() {
        tree.node(2).focus();

        expect(tree.node(1).focused()).to.be.false;
    });
});
