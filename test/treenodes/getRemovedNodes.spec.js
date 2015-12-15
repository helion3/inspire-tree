'use strict';

describe('TreeNodes.prototype.getRemovedNodes', function() {
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Create tree
        tree = new InspireTree({
            target: $('.tree'),
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
        expect(tree.getNodes().getRemovedNodes).to.be.a('function');
        expect(tree.getRemovedNodes).to.be.a('function');
    });

    it('returns only removed nodes', function() {
        var removed = tree.getRemovedNodes();

        expect(removed).to.have.length(2);
        expect(removed[0].hasChildren()).to.be.false;
    });

    it('returns hierarchy of removed nodes', function() {
        var removed = tree.getRemovedNodes(true);

        expect(removed).to.have.length(2);
        expect(removed[0].hasChildren()).to.be.true;
    });

    after(helpers.clearDOM);
});
