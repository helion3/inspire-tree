'use strict';

describe('TreeNodes.prototype.deselect', function() {
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
                id: 2
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().deselect).to.be.a('function');
        expect(tree.deselect).to.be.a('function');
    });

    it('deselects a node', function() {
        var node = tree.node(1);
        node.select();
        expect(node.selected()).to.be.true;

        tree.deselect();
        expect(node.selected()).to.be.false;
    });

    after(helpers.clearDOM);
});
