var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.loading', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().loading).to.be.a('function');
        expect(tree.loading).to.be.a('function');
    });

    it('returns loading nodes', function() {
        expect(tree.loading()).to.have.length(0);

        tree.node(1).state('loading', true);
        expect(tree.loading()).to.have.length(1);
    });
});
