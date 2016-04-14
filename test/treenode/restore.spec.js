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
        expect(tree.node(1).restore).to.be.a('function');
    });

    it('soft removes node', function() {
        var node = tree.node(1);
        var $node = $('[data-uid="' + node.id + '"]');

        node.softRemove();
        expect($node.hasClass('hidden')).to.be.true;
        expect(node.removed()).to.be.true;

        node.restore();
        expect($node.hasClass('hidden')).to.be.false;
        expect(node.removed()).to.be.false;
    });

    it('resets state on restore when configured', function() {
        tree = new InspireTree({
            target: $tree,
            nodes: {
                resetStateOnRestore: true
            },
            data: [{
                text: 'A',
                id: 1
            }]
        });

        var node = tree.node(1);

        node.select();
        expect(node.selected()).to.be.true;

        node.softRemove();
        expect(node.selected()).to.be.true;

        node.restore();
        expect(node.selected()).to.be.false;
    });

    after(helpers.clearDOM);
});
