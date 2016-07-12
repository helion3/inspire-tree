'use strict';

describe('TreeNodes.prototype.export', function() {
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
                    text: 'B'
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().export).to.be.a('function');
        expect(tree.export).to.be.a('function');
    });

    // Note: logic tested by copy-merges

    after(helpers.clearDOM);
});
