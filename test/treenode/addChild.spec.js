var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.addChild', function() {
    var tree;

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
        var node = tree.node(1);

        // Make sure nothing exists yet
        expect(node.hasChildren()).to.be.false;

        node.addChild({
            text: 'C'
        });

        expect(node.hasChildren()).to.be.true;
    });

    it('returns a TreeNode with a parent', function() {
        var node = tree.node(1);

        var child = node.addChild({
            text: 'A'
        });

        expect(tree.isNode(child)).to.be.true;
        expect(child.hasParent()).to.be.true;
    });

    it('applies sort correctly to new children', function() {
        var node = tree.node(1);

        node.addChild({
            text: 'B'
        });

        expect(node.children[0].text).to.equal('A');
        expect(node.children[1].text).to.equal('B');
        expect(node.children[2].text).to.equal('C');
    });
});
