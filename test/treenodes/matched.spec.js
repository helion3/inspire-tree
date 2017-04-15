var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.matched', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'fox',
                id: 1
            }, {
                text: 'lemur',
                id: 2
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().matched).to.be.a('function');
        expect(tree.matched).to.be.a('function');
    });

    it('returns only matched nodes', function() {
        tree.search('fox');

        expect(tree.matched()).to.have.length(1);
    });
});
