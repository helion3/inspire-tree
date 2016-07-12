'use strict';

describe('TreeNodes.prototype.selectDeep', function() {
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
        expect(tree.nodes().selectDeep).to.be.a('function');
        expect(tree.selectDeep).to.be.a('function');
    });

    it('selects all nodes', function() {
        expect(tree.selected()).to.have.length(0);

        tree.selectDeep();

        expect(tree.selected()).to.have.length(1);
    });

    after(helpers.clearDOM);
});
