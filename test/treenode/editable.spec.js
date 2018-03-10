const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.editable', function() {
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
        expect(tree.node(1).editable).to.be.a('function');
    });

    it('returns false when tree is not editable', function() {
        const node = tree.node(1);
        expect(node.editable()).to.be.false;

        node.state('editable', true);
        expect(node.editing()).to.be.false;
    });

    it('returns true when editable', function() {
        // Create tree
        tree = new InspireTree({
            editable: true,
            data: [{
                text: 'A',
                id: 1
            }]
        });

        const node = tree.node(1);
        expect(node.editable()).to.be.true;

        node.state('editable', false);
        expect(node.editing()).to.be.false;
    });
});
