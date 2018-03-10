const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.hasParent', function() {
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
        expect(tree.node(1).hasParent).to.be.a('function');
    });

    it('returns false for root node', function() {
        expect(tree.node(1).hasParent()).to.be.false;
    });

    it('returns true for child node', function() {
        expect(tree.node(2).hasParent()).to.be.true;
    });
});
