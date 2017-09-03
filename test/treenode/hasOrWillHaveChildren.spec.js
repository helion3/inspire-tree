var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.hasChildren', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: function(node, resolve) {
                resolve([{
                    text: 'A',
                    id: 1,
                    children: [{
                        text: 'AA',
                        id: 11
                    }]
                }, {
                    text: 'B',
                    id: 2,
                    children: true
                }, {
                    text: 'C',
                    id: 3,
                    children: []
                }]);
            }
        });
    });

    it('exists', function() {
        expect(tree.node(1).hasOrWillHaveChildren).to.be.a('function');
    });

    it('returns true for parent node', function() {
        expect(tree.node(1).hasOrWillHaveChildren()).to.be.true;
    });

    it('returns true for dynamic parent node', function() {
        expect(tree.node(2).hasOrWillHaveChildren()).to.be.true;
    });

    it('returns false for a node with 0 length children', function() {
        expect(tree.node(3).hasOrWillHaveChildren()).to.be.false;
    });
});
