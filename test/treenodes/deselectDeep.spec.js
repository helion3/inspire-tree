const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNodes.prototype.deselectDeep', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'B',
                    id: 2
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().deselect).to.be.a('function');
        expect(tree.deselect).to.be.a('function');
    });

    it('deselects all nodes', function() {
        const node = tree.node(2);
        node.select();
        expect(node.selected()).to.be.true;

        tree.deselectDeep();
        expect(node.selected()).to.be.false;
    });
});
