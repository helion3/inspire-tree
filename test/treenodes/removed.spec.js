var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.removed', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'AA',
                    itree: {
                        state: {
                            removed: true
                        }
                    }
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
        expect(tree.nodes().removed).to.be.a('function');
        expect(tree.removed).to.be.a('function');
    });

    it('returns only removed nodes', function() {
        var removed = tree.removed();

        expect(removed).to.have.length(2);
        expect(removed[0].hasChildren()).to.be.false;
    });

    it('returns hierarchy of removed nodes', function() {
        var removed = tree.removed(true);

        expect(removed).to.have.length(2);
        expect(removed[0].hasChildren()).to.be.true;
    });
});
