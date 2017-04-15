var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.hasVisibleChildren', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'AA',
                    id: 11
                }]
            }, {
                text: 'B',
                id: 2
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).hasVisibleChildren).to.be.a('function');
    });

    it('returns true for parent with visible children', function() {
        expect(tree.node(1).hasVisibleChildren()).to.be.true;
    });

    it('returns false for parent without children', function() {
        expect(tree.node(2).hasVisibleChildren()).to.be.false;
    });

    it('returns false for parent with one hidden child', function() {
        tree.node(11).hide();

        expect(tree.node(1).hasVisibleChildren()).to.be.false;
    });

    it('returns true for parent with one visible, one hidden child', function() {
        tree.node(1).addChild({
            text: 'New'
        });

        expect(tree.node(1).hasVisibleChildren()).to.be.true;
    });
});
