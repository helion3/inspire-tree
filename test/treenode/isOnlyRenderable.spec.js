const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.isOnlyRenderable', function() {
    let tree;

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
        expect(tree.node(1).isOnlyRenderable).to.be.a('function');
    });

    it('returns false for any node', function() {
        expect(tree.node(1).isOnlyRenderable()).to.be.false;
        expect(tree.node(2).isOnlyRenderable()).to.be.false;
        expect(tree.node(3).isOnlyRenderable()).to.be.false;
    });

    it('returns true when surrounded by hidde nodes', function() {
        tree.nodes([1, 3]).hide();

        expect(tree.node(2).isOnlyRenderable()).to.be.true;
    });
});
