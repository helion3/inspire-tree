var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.restore', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                itree: {
                    state: {
                        removed: true
                    }
                }
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().restore).to.be.a('function');
        expect(tree.restore).to.be.a('function');
    });

    it('restores a node', function() {
        expect(tree.removed()).to.have.length(1);

        tree.restore();
        expect(tree.removed()).to.have.length(0);
    });
});
