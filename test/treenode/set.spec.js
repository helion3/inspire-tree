const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.set', function() {
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
        expect(tree.node(1).set).to.be.a('function');
    });

    it('updates node property', function() {
        const node = tree.node(1);

        // Dirty would be true due to renderable position calcs
        node.itree.dirty = false;
        expect(node.itree.dirty).to.be.false;

        expect(node.text).to.equal('A');

        node.set('text', 'New');
        expect(node.itree.dirty).to.be.true;
        expect(node.text).to.equal('New');
    });
});
