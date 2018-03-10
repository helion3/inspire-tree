const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.hasChildren', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'AA',
                    id: 2
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).hasChildren).to.be.a('function');
    });

    it('returns true for parent node', function() {
        expect(tree.node(1).hasChildren()).to.be.true;
    });

    it('returns false for child node', function() {
        expect(tree.node(2).hasChildren()).to.be.false;
    });
});
