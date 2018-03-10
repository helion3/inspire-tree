const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.selected', function() {
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
        expect(tree.node(1).selected).to.be.a('function');
    });

    it('returns false when not selected', function() {
        expect(tree.node(1).selected()).to.be.false;
    });

    it('returns true when selected', function() {
        const node = tree.node(1);
        node.select();

        expect(node.selected()).to.be.true;
    });
});
