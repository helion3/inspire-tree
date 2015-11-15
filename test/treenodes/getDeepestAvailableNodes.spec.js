'use strict';

describe('TreeNodes.prototype.getDeepestAvailableNodes', function() {
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
                id: 1,
                children: [{
                    text: 'AA'
                }, {
                    text: 'AAA',
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
            }, {
                text: 'C'
            }]
        });
    });

    it('exists', function() {
        expect(tree.getNodes().getDeepestAvailableNodes).to.be.a('function');
    });

    it('returns only deepest available nodes', function() {
        expect(tree.getNodes().getDeepestAvailableNodes()).to.have.length(2);
    });

    after(helpers.clearDOM);
});
