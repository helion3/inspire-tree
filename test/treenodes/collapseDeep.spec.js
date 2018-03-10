const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNodes.prototype.collapseDeep', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                children: [{
                    text: 'B',
                    id: 2,
                    children: [{
                        text: 'C'
                    }]
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().collapseDeep).to.be.a('function');
        expect(tree.collapseDeep).to.be.a('function');
    });

    it('collapses all nodes', function() {
        const node = tree.node(2);
        node.expand();
        expect(node.expanded()).to.be.true;

        tree.collapseDeep();
        expect(node.expanded()).to.be.false;
    });
});
