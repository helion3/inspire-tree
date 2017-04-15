var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.nextVisibleAncestralSiblingNode', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                children: [{
                    text: 'AA',
                    children: [{
                        text: 'AAA',
                        id: 2
                    }]
                }]
            }, {
                text: 'B'
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(2).nextVisibleAncestralSiblingNode).to.be.a('function');
    });

    it('returns second root node', function() {
        expect(tree.node(2).nextVisibleAncestralSiblingNode().text).to.equal('B');
    });
});
