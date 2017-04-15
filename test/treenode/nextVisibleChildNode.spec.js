var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.nextVisibleChildNode', function() {
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
                }, {
                    text: 'AA2',
                    id: 3
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).nextVisibleChildNode).to.be.a('function');
    });

    it('returns undefined when node collapsed', function() {
        expect(tree.node(1).nextVisibleChildNode()).to.be.undefined;
        tree.node(1).expand();
    });

    it('returns first node', function() {
        expect(tree.node(1).nextVisibleChildNode().id).to.equal('2');
    });

    it('returns second node when first hidden', function() {
        tree.node(2).hide();
        expect(tree.node(1).nextVisibleChildNode().id).to.equal('3');
    });
});
