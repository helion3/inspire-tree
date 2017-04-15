var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.flatten', function() {
    var tree;

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

        var flattened = tree.nodes().flatten('hidden');
        expect(flattened).to.have.length(2);
    });

    it('returns matches for custom booleans', function() {
        expect(tree.nodes().flatten('customBool')).to.have.length(1);
    });
});
