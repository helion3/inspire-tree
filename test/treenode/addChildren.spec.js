const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.addChildren', function() {
    let tree;

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
        const node = tree.node(1);
        expect(node.hasChildren()).to.be.false;

        node.addChildren([{
            text: 'C'
        }]);

        expect(node.hasChildren()).to.be.true;
    });

    it('applies sort correctly to new children', function() {
        const node = tree.node(1);

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
