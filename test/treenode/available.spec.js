var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.available', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'AA',
                    id: 2
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).available).to.be.a('function');
    });

    it('returns true when visible', function() {
        expect(tree.node(1).available()).to.be.true;
    });

    it('returns true when parent collapsed', function() {
        expect(tree.node(2).available()).to.be.true;
    });

    it('returns false when hidden', function() {
        var node = tree.node(1);
        node.hide();

        expect(node.available()).to.be.false;
    });
});
