'use strict';

describe('TreeNode.prototype.show', function() {
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
        expect(tree.node(1).show).to.be.a('function');
    });

    it('shows node', function() {
        var node = tree.node(1);
        node.hide();

        var $node = $('[data-uid="' + node.id + '"]');
        expect($node.hasClass('hidden')).to.be.true;
        expect(node.hidden()).to.be.true;

        node.show();
        expect($node.hasClass('hidden')).to.be.false;
        expect(node.hidden()).to.be.false;
    });

    after(helpers.clearDOM);
});
