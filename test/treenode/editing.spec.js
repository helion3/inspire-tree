const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.editing', function() {
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
        expect(tree.node(1).editing).to.be.a('function');
    });

    it('returns true when in edit mode', function() {
        const node = tree.node(1);
        expect(node.editing()).to.be.false;

        node.state('editing', true);
        expect(node.editing()).to.be.true;
    });
});
