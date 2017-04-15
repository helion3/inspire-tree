var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.available', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'C'
                }]
            }, {
                text: 'B',
                itree: {
                    state: {
                        removed: true
                    }
                }
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().available).to.be.a('function');
        expect(tree.available).to.be.a('function');
    });

    it('returns only available nodes', function() {
        expect(tree.nodes().available()).to.have.length(2);
    });

    it('returns only available nodes from a treenodes subset', function() {
        expect(tree.nodes().deepest().available()).to.have.length(1);
    });
});
