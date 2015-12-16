'use strict';

describe('TreeNode.prototype.select', function() {
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
        expect(tree.node(1).select).to.be.a('function');
    });

    it('select via click', function() {
        var node = tree.node(1);

        var $node = $('[data-uid="' + node.id + '"]');
        expect($node.hasClass('selected')).to.be.false;

        $node.find('> div .title').click();
        expect($node.hasClass('selected')).to.be.true;
    });

    it('deselects other nodes on node change', function() {
        tree.node(2).select();

        expect(tree.node(1).selected()).to.be.false;
    });

    it('select via api', function() {
        var node = tree.node(1);

        var $node = $('[data-uid="' + node.id + '"]');
        expect($node.hasClass('selected')).to.be.false;

        node.select();
        expect($node.hasClass('selected')).to.be.true;
    });

    it('allows multiple select', function() {
        tree.preventDeselection = true;

        tree.node(1).select();
        tree.node(2).select();

        expect(tree.selected()).to.have.length(2);
    });

    after(helpers.clearDOM);
});
