'use strict';

describe('TreeNode.prototype.deselect', function() {
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
        expect(tree.node(1).deselect).to.be.a('function');
    });

    it('deselects via click', function() {
        var node = tree.node(1);
        node.select();

        var $node = $('[data-uid="' + node.id + '"]');
        expect($node.hasClass('selected')).to.be.true;

        $node.find('> div .title').click();
        expect($node.hasClass('selected')).to.be.false;
    });

    it('deselects via api', function() {
        var node = tree.node(1);
        node.select();

        var $node = $('[data-uid="' + node.id + '"]');
        expect($node.hasClass('selected')).to.be.true;

        node.deselect();
        expect($node.hasClass('selected')).to.be.false;
    });

    after(helpers.clearDOM);
});
