var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('Tree.isTreeNodes', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: []
        });
    });

    it('exists', function() {
        expect(tree.isTreeNodes).to.be.a('function');
    });

    it('returns false an array', function() {
        expect(tree.isTreeNodes([])).to.be.false;
    });

    it('returns true for a node array', function() {
        expect(tree.isTreeNodes(tree.nodes())).to.be.true;
    });
});
