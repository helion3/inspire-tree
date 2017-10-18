var expect = require('chai').expect;
var InspireTree = require('../../../build/inspire-tree');

describe('TreeNodes extends Array.prototype.shift', function() {
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
        expect(tree.nodes().shift).to.be.a('function');
        expect(tree.shift).to.be.a('function');
    });

    it('shifts the first element off and returns it', function() {
        var node = tree.nodes().shift();

        expect(tree.nodes()).to.have.length(1);
        expect(node.id).to.equal(1);
    });
});
