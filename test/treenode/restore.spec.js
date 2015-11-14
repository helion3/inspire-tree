'use strict';

describe('TreeNode.prototype.restore', function() {
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
        expect(tree.getNode(1).restore).to.be.a('function');
    });

    it('soft removes node', function() {
        var node = tree.getNode(1);
        var $node = $('[data-uid="' + node.id + '"]');

        node.softRemove();
        expect($node.hasClass('hidden')).to.be.true;
        expect(node.removed()).to.be.true;

        node.restore();
        expect($node.hasClass('hidden')).to.be.false;
        expect(node.removed()).to.be.false;
    });

    after(helpers.clearDOM);
});
