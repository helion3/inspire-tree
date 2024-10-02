const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.getParent', function() {
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
        expect(tree.node(1).getParent).to.be.a('function');
    });

    it('returns undefined for root node', function() {
        expect(tree.node(1).getParent()).to.be.undefined;
    });

    it('returns parent for child node', function() {
        expect(tree.node(2).getParent().id).to.equal(1);
    });

    it('does not show private parent property in Object.keys', function() {
        expect(Object.keys(tree.node(1).itree).includes('parent')).to.equal(false);
    });
});
