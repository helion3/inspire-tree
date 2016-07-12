'use strict';

describe('TreeNodes.prototype.select', function() {
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

    it('exists', function() {
        expect(tree.nodes().select).to.be.a('function');
        expect(tree.select).to.be.a('function');
    });

    it('selects root nodes', function() {
        expect(tree.selected()).to.have.length(0);

        tree.select();

        expect(tree.selected()).to.have.length(1);
    });

    after(helpers.clearDOM);
});
