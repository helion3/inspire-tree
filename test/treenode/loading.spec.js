const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.loading', function() {
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
        expect(tree.node(1).loading).to.be.a('function');
    });

    it('returns true when loading', function() {
        const node = tree.node(1);
        expect(node.loading()).to.be.false;

        node.state('loading', true);
        expect(node.loading()).to.be.true;
    });
});
