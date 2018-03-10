const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNodes.prototype.expand', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'AA'
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().expand).to.be.a('function');
        expect(tree.expand).to.be.a('function');
    });

    it('expands a node', function() {
        const node = tree.node(1);
        expect(node.expanded()).to.be.false;

        tree.expand();
        expect(node.expanded()).to.be.true;
    });
});
