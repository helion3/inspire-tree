var expect = require('chai').expect;
var InspireTree = require('../../../build/inspire-tree');

describe('TreeNodes extends Array.prototype.filter', function() {
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

    it('returns only nodes that pass testing', function() {
        var matches = tree.nodes().filter(function(node) {
            return parseInt(node.id, 10) % 2 === 0;
        });

        expect(matches).to.have.length(1);
        expect(matches[0].id).to.equal('2');
    });
});
