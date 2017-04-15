var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.restore', function() {
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
        expect(tree.node(1).restore).to.be.a('function');
    });

    it('soft removes node', function() {
        var node = tree.node(1);

        node.softRemove();
        expect(node.removed()).to.be.true;

        node.restore();
        expect(node.removed()).to.be.false;
    });

    it('resets state on restore when configured', function() {
        tree = new InspireTree({
            nodes: {
                resetStateOnRestore: true
            },
            data: [{
                text: 'A',
                id: 1
            }]
        });

        var node = tree.node(1);

        node.select();
        expect(node.selected()).to.be.true;

        node.softRemove();
        expect(node.selected()).to.be.true;

        node.restore();
        expect(node.selected()).to.be.false;
    });
});
