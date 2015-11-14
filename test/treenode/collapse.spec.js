'use strict';

describe('TreeNode.prototype.collapse', function() {
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
                    text: 'AA'
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.getNode(1).collapse).to.be.a('function');
    });

    it('collapses children via click', function() {
        var node = tree.getNode(1);
        node.expand();

        var $node = $('[data-uid="' + node.id + '"]');
        expect($node.hasClass('collapsed')).to.be.false;

        $node.find('> div .toggle').click();
        expect($node.hasClass('collapsed')).to.be.true;
    });

    it('collapses children via api', function() {
        var node = tree.getNode(1);
        node.expand();

        var $node = $('[data-uid="' + node.id + '"]');
        expect($node.hasClass('collapsed')).to.be.false;

        node.collapse();
        expect($node.hasClass('collapsed')).to.be.true;
    });

    after(helpers.clearDOM);
});
