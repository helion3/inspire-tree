var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.loading', function() {
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
        expect(tree.node(1).loading).to.be.a('function');
    });

    it('returns true when loading', function() {
        var node = tree.node(1);
        expect(node.loading()).to.be.false;

        node.state('loading', true);
        expect(node.loading()).to.be.true;
    });
});
