var expect = require('chai').expect;
var InspireTree = require('../../../build/inspire-tree');

describe('TreeNodes extends Array.prototype.sort', function() {
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
            }, {
                text: 'C',
                id: 3
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().sort).to.be.a('function');
        expect(tree.sort).to.be.a('function');
    });

    it('sorts treenodes', function() {
        var nodes = tree.nodes();

        nodes.sort(function(a, b) {
            return parseInt(a.id, 10) > parseInt(b.id, 10) ? -1 : 1;
        });

        expect(nodes[0].text).to.equal('C');
        expect(nodes[1].text).to.equal('B');
        expect(nodes[2].text).to.equal('A');
    });
});
