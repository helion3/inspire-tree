const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.focused', function() {
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
        expect(tree.node(1).focused).to.be.a('function');
    });

    it('returns false when not focused', function() {
        expect(tree.node(1).focused()).to.be.false;
    });

    it('returns true when focused', function() {
        const node = tree.node(1);

        node.focus();
        expect(node.focused()).to.be.true;
    });
});
