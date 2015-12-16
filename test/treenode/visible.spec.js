'use strict';

describe('TreeNode.prototype.visible', function() {
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
        expect(tree.node(1).visible).to.be.a('function');
    });

    it('returns true when visible', function() {
        expect(tree.node(1).visible()).to.be.true;
    });

    it('returns false when hidden', function() {
        var node = tree.node(1);
        node.hide();

        expect(node.visible()).to.be.false;
    });

    after(helpers.clearDOM);
});
