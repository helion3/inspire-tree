var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.visible', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1
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
        expect(tree.nodes().visible).to.be.a('function');
        expect(tree.visible).to.be.a('function');
    });

    it('returns only visible nodes', function() {
        expect(tree.nodes().visible()).to.have.length(1);
    });
});
