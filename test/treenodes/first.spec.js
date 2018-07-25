const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNodes.prototype.first', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1
            }, {
                text: 'B'
            }, {
                text: 'C',
                id: 3
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().first).to.be.a('function');
        expect(tree.first).to.be.a('function');
    });

    it('returns first visible node', function() {
        tree.node(1).hide();

        expect(tree.first(node => node.visible()).text).to.equal('B');
    });

    it('returns first selected node', function() {
        tree.node(3).select();

        expect(tree.first(node => node.selected()).text).to.equal('C');
    });
});
