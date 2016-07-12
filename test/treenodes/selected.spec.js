'use strict';

describe('TreeNodes.prototype.selected', function() {
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
        expect(tree.nodes().selected).to.be.a('function');
        expect(tree.selected).to.be.a('function');
    });

    it('returns an empty array when none selected', function() {
        expect(tree.selected()).to.have.length(0);
    });

    it('returns selected root node', function() {
        tree.node(1).select();

        expect(tree.selected()).to.have.length(1);
    });

    it('auto-selects a node when selection.require=true', function() {
        tree = new InspireTree({
            target: $tree,
            selection: {
                require: true
            },
            data: [{
                text: 'A',
                id: 1
            }]
        });

        expect(tree.selected()).to.have.length(1);
    });

    it('rejects deselect of only node when selection.require=true', function() {
        tree.node(1).deselect();

        expect(tree.selected()).to.have.length(1);
    });

    after(helpers.clearDOM);
});
