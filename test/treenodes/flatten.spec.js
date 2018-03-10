const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNodes.prototype.flatten', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                customBool: true,
                children: [{
                    text: 'B',
                    id: 2
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().flatten).to.be.a('function');
        expect(tree.flatten).to.be.a('function');
    });

    it('returns flat array of hidden nodes', function() {
        tree.node(1).hide();
        tree.node(2).hide();

        const flattened = tree.nodes().flatten('hidden');
        expect(flattened).to.have.length(2);
    });

    it('returns matches for custom booleans', function() {
        expect(tree.nodes().flatten('customBool')).to.have.length(1);
    });
});
