const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNodes.prototype.expandParents', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'AA',
                    id: 2
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().expandParents).to.be.a('function');
    });

    it('returns a promise', function() {
        const node = tree.node(1);
        expect(node.expanded()).to.be.false;

        node.getChildren().expandParents();
        expect(node.expanded()).to.be.true;
    });
});
