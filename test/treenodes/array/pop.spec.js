var expect = require('chai').expect;
var InspireTree = require('../../../build/inspire-tree');

describe('TreeNodes extends Array.prototype.pop', function() {
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
        expect(tree.nodes().pop).to.be.a('function');
        expect(tree.pop).to.be.a('function');
    });

    it('pops the last element off and returns it', function() {
        var node = tree.nodes().pop();

        expect(tree.nodes()).to.have.length(1);
        expect(node.id).to.equal('2');
    });
});
