var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.addChildren', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            sort: 'text',
            data: [{
                text: 'A',
                id: 1
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).addChildren).to.be.a('function');
    });

    it('adds new children', function() {
        var node = tree.node(1);
        expect(node.hasChildren()).to.be.false;

        node.addChildren([{
            text: 'C'
        }]);

        expect(node.hasChildren()).to.be.true;
    });

    it('applies sort correctly to new children', function() {
        var node = tree.node(1);

        node.addChildren([{
            text: 'B'
        }, {
            text: 'A'
        }]);

        expect(node.children[0].text).to.equal('A');
        expect(node.children[1].text).to.equal('B');
        expect(node.children[2].text).to.equal('C');
    });
});
