const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('Tree.isTreeNode', function() {
    let tree;

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
        expect(InspireTree.isTreeNode).to.be.a('function');
    });

    it('returns false a node-like object', function() {
        expect(InspireTree.isTreeNode({ text: 'A' })).to.be.false;
    });

    it('returns true for a node', function() {
        expect(InspireTree.isTreeNode(tree.node(1))).to.be.true;
    });
});
