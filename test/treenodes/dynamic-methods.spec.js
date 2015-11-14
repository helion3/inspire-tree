'use strict';

describe('TreeNodes dynamic methods', function() {
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
            }]
        });
    });

    it('"hide"', function() {
        expect(tree.getNodes().hide).to.be.a('function');
    });

    after(helpers.clearDOM);
});
