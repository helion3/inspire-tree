const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.hasAncestor', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'AA',
                    id: 11,
                    children: [{
                        text: 'AAA',
                        id: 111
                    }]
                }]
            }, {
                text: 'B',
                id: 2
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).hasAncestor).to.be.a('function');
    });

    it('returns true for parent node', function() {
        expect(tree.node(11).hasAncestor(tree.node(1))).to.be.true;
    });

    it('returns true for grandparent node', function() {
        expect(tree.node(111).hasAncestor(tree.node(1))).to.be.true;
    });

    it('returns false for oprhan node', function() {
        expect(tree.node(2).hasAncestor(tree.node(1))).to.be.false;
    });
});
