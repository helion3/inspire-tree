const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNodes.prototype.softRemove', function() {
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
        expect(tree.nodes().softRemove).to.be.a('function');
        expect(tree.softRemove).to.be.a('function');
    });

    it('soft-removes a node', function() {
        const node = tree.node(1);
        expect(node.removed()).to.be.false;

        node.softRemove();

        expect(tree.nodes()).to.have.length(1);
        expect(node.removed()).to.be.true;
    });
});
