var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('Tree.boundingNodes', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'AA',
                    id: 11
                }]
            }, {
                text: 'B',
                id: 2
            }, {
                text: 'C',
                id: 3
            }]
        });
    });

    it('exists', function() {
        expect(tree.boundingNodes).to.be.a('function');
    });

    it('returns correct min/max nodes', function() {
        var nodes = tree.boundingNodes.apply(tree, tree.nodes(['3', '11']));
        expect(nodes[0].id).to.equal('11');
        expect(nodes[1].id).to.equal('3');

        nodes = tree.boundingNodes.apply(tree, tree.nodes(['11', '1']));
        expect(nodes[0].id).to.equal('1');
        expect(nodes[1].id).to.equal('11');
    });
});
