const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNodes.prototype.show', function() {
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
        expect(tree.nodes().show).to.be.a('function');
        expect(tree.show).to.be.a('function');
    });

    it('shows root nodes', function() {
        const node = tree.node(1);

        node.hide();
        expect(node.hidden()).to.be.true;

        tree.show();
        expect(node.hidden()).to.be.false;
    });
});
