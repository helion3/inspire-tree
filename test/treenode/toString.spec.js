var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.toString', function() {
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
        expect(tree.node(1).toString).to.be.a('function');
    });

    it('returns text content as a string', function() {
        expect(tree.node(1).toString()).to.equal('A');
    });
});
