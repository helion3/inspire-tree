var expect = require('chai').expect;
var InspireTree = require('../../../build/inspire-tree');

describe('TreeNodes extends Array.prototype.join', function() {
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
        expect(tree.nodes().join).to.be.a('function');
        expect(tree.join).to.be.a('function');
    });

    it('returns a string representing all nodes', function() {
        expect(tree.nodes().join()).to.equal('A,B,C');
    });

    it('returns a string representing all nodes with a given separator', function() {
        expect(tree.nodes().join(';')).to.equal('A;B;C');
    });
});
