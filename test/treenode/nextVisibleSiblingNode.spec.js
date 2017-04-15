var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.nextVisibleSiblingNode', function() {
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
            }, {
                text: 'C',
                id: 3
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).nextVisibleSiblingNode).to.be.a('function');
    });

    it('returns second node', function() {
        expect(tree.node(1).nextVisibleSiblingNode().id).to.equal('2');
    });

    it('returns undefined when last node hidden', function() {
        tree.node(3).hide();
        expect(tree.node(2).nextVisibleSiblingNode()).to.be.undefined;
    });
});
