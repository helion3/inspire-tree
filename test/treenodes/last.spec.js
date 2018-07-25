const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNodes.prototype.last', function() {
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
        expect(tree.nodes().last).to.be.a('function');
        expect(tree.last).to.be.a('function');
    });

    it('returns last visible node', function() {
        tree.node(3).hide();

        expect(tree.last(node => node.visible()).text).to.equal('B');
    });

    it('returns last selected node', function() {
        tree.node(1).select();

        expect(tree.last(node => node.selected()).text).to.equal('A');
    });
});
