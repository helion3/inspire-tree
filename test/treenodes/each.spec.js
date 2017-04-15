var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.each', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1
            }, {
                text: 'B',
                id: 2
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().each).to.be.a('function');
        expect(tree.each).to.be.a('function');
    });

    it('iterates nodes', function() {
        var count = 0;

        tree.nodes().each(function() {
            count++;
        });

        expect(count).to.equal(2);
    });
});
