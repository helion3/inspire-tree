'use strict';

describe('Tree.enableDeselection', function() {
    var $tree;
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Query DOM
        $tree = $('.tree');

        // Create tree
        tree = new InspireTree({
            target: $tree,
            selection: {
                multiple: true
            },
            data: [{
                text: 'A',
                id: 1
            }, {
                text: 'B',
                id: 2
            }]
        });
    });

    it('exists', function() {
        expect(tree.enableDeselection).to.be.a('function');
    });

    it('prevents deselection when disabled', function() {
        tree.disableDeselection().nodes([1, 2]).select();
        expect(tree.node(1).selected()).to.be.true;
        expect(tree.node(2).selected()).to.be.true;
    });

    it('deselects nodes when enabled', function() {
        tree.enableDeselection().deselect();

        tree.node(1).select();
        expect(tree.node(1).selected()).to.be.true;

        tree.node(2).select();
        expect(tree.node(1).selected()).to.be.false;
        expect(tree.node(2).selected()).to.be.true;
    });

    after(helpers.clearDOM);
});
