var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.removed', function() {
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
        expect(tree.node(1).removed).to.be.a('function');
    });

    it('soft removes node', function() {
        var node = tree.node(1);
        node.softRemove();

        expect(node.removed()).to.be.true;
    });
});
