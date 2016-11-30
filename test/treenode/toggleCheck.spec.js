'use strict';

describe('TreeNode.prototype.toggleCheck', function() {
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

    var node;

    it('exists', function() {
        node = tree.node(1);
        expect(node.toggleCheck).to.be.a('function');
    });

    it('selects node', function() {
        node.toggleCheck();

        expect(node.checked()).to.be.true;
    });

    it('deselects node', function() {
        node.toggleCheck();

        expect(node.checked()).to.be.false;
    });

    after(helpers.clearDOM);
});
