const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('Tree.isTreeNodes', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: []
        });
    });

    it('exists', function() {
        expect(InspireTree.isTreeNodes).to.be.a('function');
    });

    it('returns false an array', function() {
        expect(InspireTree.isTreeNodes([])).to.be.false;
    });

    it('returns true for a node array', function() {
        expect(InspireTree.isTreeNodes(tree.nodes())).to.be.true;
    });
});
