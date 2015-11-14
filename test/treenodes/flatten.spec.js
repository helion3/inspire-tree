'use strict';

describe('TreeNodes.prototype.flatten', function() {
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
                    text: 'B',
                    id: 2
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.getNodes().flatten).to.be.a('function');
    });

    it('returns flat array of hidden nodes', function() {
        tree.getNode(1).hide();
        tree.getNode(2).hide();

        var flattened = tree.getNodes().flatten('hidden');
        expect(flattened).to.have.length(2);
    });

    after(helpers.clearDOM);
});
