const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.toggleSelect', function() {
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

    let node;

    it('exists', function() {
        node = tree.node(1);
        expect(node.toggleSelect).to.be.a('function');
    });

    it('selects node', function() {
        node.toggleSelect();

        expect(node.selected()).to.be.true;
    });

    it('deselects node', function() {
        node.toggleSelect();

        expect(node.selected()).to.be.false;
    });
});
