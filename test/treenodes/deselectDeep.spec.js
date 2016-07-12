'use strict';

describe('TreeNodes.prototype.deselectDeep', function() {
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
        expect(tree.nodes().deselect).to.be.a('function');
        expect(tree.deselect).to.be.a('function');
    });

    it('deselects all nodes', function() {
        var node = tree.node(2);
        node.select();
        expect(node.selected()).to.be.true;

        tree.deselectDeep();
        expect(node.selected()).to.be.false;
    });

    after(helpers.clearDOM);
});
