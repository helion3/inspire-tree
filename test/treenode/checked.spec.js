const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.checked', function() {
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
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).checked).to.be.a('function');
    });

    it('returns the checked state of the node', function() {
        const node = tree.node(1);
        expect(node.checked()).to.be.false;

        node.check();
        expect(node.checked()).to.be.true;
    });
});
