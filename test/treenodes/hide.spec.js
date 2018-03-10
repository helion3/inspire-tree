const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNodes.prototype.hide', function() {
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
        expect(tree.nodes().hide).to.be.a('function');
        expect(tree.hide).to.be.a('function');
    });

    it('hides root nodes', function() {
        const node = tree.node(1);
        expect(node.hidden()).to.be.false;

        tree.hide();

        expect(node.hidden()).to.be.true;
    });
});
