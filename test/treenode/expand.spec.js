var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.expand', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
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
        expect(tree.node(1).expand).to.be.a('function');
    });

    it('returns a promise', function() {
        expect(tree.node(1).expand().then).to.be.a('function');
    });

    it('collapses children', function() {
        var node = tree.node(1);

        node.expand();
        expect(node.collapsed()).to.be.false;

        node.collapse();
        expect(node.collapsed()).to.be.true;
    });
});
