var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.indexPath', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    id: 11,
                    text: 'AA'
                }]
            }, {
                text: 'B',
                id: 2
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).indexPath).to.be.a('function');
    });

    it('returns the correct index path', function() {
        expect(tree.node(1).indexPath()).to.equal('0');
        expect(tree.node(11).indexPath()).to.equal('0.0');
    });
});
