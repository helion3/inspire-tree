const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.deselect', function() {
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
        expect(tree.node(1).deselect).to.be.a('function');
    });

    it('deselects', function() {
        const node = tree.node(1);
        node.select();

        expect(node.selected()).to.be.true;

        node.deselect();
        expect(node.selected()).to.be.false;
    });
});
