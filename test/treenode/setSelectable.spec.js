'use strict';

describe('TreeNode.prototype.setSelectable', function() {
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
        expect(tree.node(1).setSelectable).to.be.a('function');
    });

    it('disables selection of a node', function() {
        var node = tree.node(1);
        node.setSelectable(false);

        expect(node.selectable()).to.be.false;

        node.select();
        expect(node.selected()).to.be.false;
    });

    after(helpers.clearDOM);
});
