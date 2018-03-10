const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.addChild', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: []
            }],
            sort: 'text'
        });
    });

    it('exists', function() {
        expect(tree.node(1).addChild).to.be.a('function');
    });

    it('adds a new child', function() {
        const node = tree.node(1);

        // Make sure nothing exists yet
        expect(node.hasChildren()).to.be.false;

        node.addChild({
            text: 'C'
        });

        expect(node.hasChildren()).to.be.true;
    });

    it('returns a TreeNode with a parent', function() {
        const node = tree.node(1);

        const child = node.addChild({
            text: 'A'
        });

        expect(InspireTree.isTreeNode(child)).to.be.true;
        expect(child.hasParent()).to.be.true;
    });

    it('applies sort correctly to new children', function() {
        const node = tree.node(1);

        node.addChild({
            text: 'B'
        });

        expect(node.children[0].text).to.equal('A');
        expect(node.children[1].text).to.equal('B');
        expect(node.children[2].text).to.equal('C');
    });
});
