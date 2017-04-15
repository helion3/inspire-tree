var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.select', function() {
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
        expect(tree.nodes().select).to.be.a('function');
        expect(tree.select).to.be.a('function');
    });

    it('selects root nodes', function() {
        expect(tree.selected()).to.have.length(0);

        tree.select();

        expect(tree.selected()).to.have.length(1);
    });
});
