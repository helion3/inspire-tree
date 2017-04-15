var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.nextVisibleNode', function() {
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
            }, {
                text: 'B',
                id: 4
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).nextVisibleNode).to.be.a('function');
    });

    it('finds sibling of parent when visible child/sibling nodes unavailable', function() {
        tree.node(3).hide();

        expect(tree.node(2).nextVisibleNode().id).to.equal('4');
    });
});
