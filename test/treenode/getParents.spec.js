var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.getParents', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'AA',
                    id: 2,
                    children: [{
                        text: 'AAA',
                        id: 3
                    }]
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).getParents).to.be.a('function');
    });

    it('returns empty array for root node', function() {
        expect(tree.node(1).getParents()).to.have.length(0);
    });

    it('returns both parents for child node', function() {
        var parents = tree.node(3).getParents();

        expect(parents).to.have.length(2);
        expect(parents[0].id).to.equal('2');
        expect(parents[1].id).to.equal('1');
    });
});
