var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.softRemove', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            nodes: {
                resetStateOnRestore: false
            },
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'AA'
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).softRemove).to.be.a('function');
    });

    it('soft removes node', function() {
        var node = tree.node(1);
        expect(node.removed()).to.be.false;

        node.softRemove();
        expect(node.removed()).to.be.true;
    });

    it('retains state on soft remove', function() {
        var node = tree.node(1);

        node.restore();
        node.select();

        expect(node.selected()).to.be.true;

        node.softRemove();
        expect(node.selected()).to.be.true;
    });

    it('excludes removed nodes from selected filter', function() {
        expect(tree.node(1).selected()).to.be.true;
        expect(tree.selected()).to.have.length(0);

        tree.node(1).restore();
        expect(tree.selected()).to.have.length(1);
    });
});
