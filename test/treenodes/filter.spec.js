var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.filter', function() {
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
        expect(tree.nodes().filter).to.be.a('function');
        expect(tree.filter).to.be.a('function');
    });


    it('returns matches for custom booleans', function() {
        tree.node(2).select();

        expect(tree.filter('selected')).to.have.length(1);
    });
});
