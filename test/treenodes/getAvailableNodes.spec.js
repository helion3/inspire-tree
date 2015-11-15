'use strict';

describe('TreeNodes.prototype.getAvailableNodes', function() {
    var $tree;
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Query DOM
        $tree = $('.tree');

        // Create tree
        tree = new InspireTree({
            target: $tree,
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
        expect(tree.getNodes().getAvailableNodes).to.be.a('function');
    });

    it('returns only available nodes', function() {
        expect(tree.getNodes().getAvailableNodes()).to.have.length(1);
    });

    after(helpers.clearDOM);
});
