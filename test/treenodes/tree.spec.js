var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.tree', function() {
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
        expect(tree.nodes().tree).to.be.a('function');
    });

    it('returns tree instance', function() {
        expect(tree === tree.nodes().tree()).to.be.true;
    });
});
