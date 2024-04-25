const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.unshiftChild', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: []
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).unshiftChild).to.be.a('function');
    });

    it('adds a new child', function() {
        const node = tree.node(1);

        // Make sure nothing exists yet
        expect(node.hasChildren()).to.be.false;

        node.unshiftChild({
            text: 'A'
        });

        expect(node.hasChildren()).to.be.true;
    });

    it('returns a TreeNode with a parent', function() {
        const node = tree.node(1);

        const child = node.unshiftChild({
            text: 'B'
        });

        expect(InspireTree.isTreeNode(child)).to.be.true;
        expect(child.hasParent()).to.be.true;
    });

    it('nodes are in the correct order', function() {
        const node = tree.node(1);

        node.unshiftChild({
            text: 'C'
        });

        expect(node.children[0].text).to.equal('C');
        expect(node.children[1].text).to.equal('B');
    });
});
