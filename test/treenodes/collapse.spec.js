const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNodes.prototype.collapse', function() {
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
        expect(tree.nodes().collapse).to.be.a('function');
        expect(tree.collapse).to.be.a('function');
    });

    it('collapses a node', function() {
        const node = tree.node(1);
        node.expand();
        expect(node.expanded()).to.be.true;

        tree.collapse();
        expect(node.expanded()).to.be.false;
    });
});
