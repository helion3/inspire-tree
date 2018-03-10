const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.expanded', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'AA'
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).expanded).to.be.a('function');
    });

    it('returns false when collapsed', function() {
        expect(tree.node(1).expanded()).to.be.false;
    });

    it('returns true when expanded', function() {
        const node = tree.node(1);
        node.expand();

        expect(node.expanded()).to.be.true;
    });
});
