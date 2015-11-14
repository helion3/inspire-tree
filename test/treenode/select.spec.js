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
        expect(tree.getNode(1).select).to.be.a('function');
    });

    it('select via click', function() {
        var node = tree.getNode(1);

        var $node = $('[data-uid="' + node.id + '"]');
        expect($node.hasClass('selected')).to.be.false;

        $node.find('> div .title').click();
        expect($node.hasClass('selected')).to.be.true;
    });

    it('deselects other nodes on node change', function() {
        tree.getNode(2).select();

        expect(tree.getNode(1).selected()).to.be.false;
    });

    it('select via api', function() {
        var node = tree.getNode(1);

        var $node = $('[data-uid="' + node.id + '"]');
        expect($node.hasClass('selected')).to.be.false;

        node.select();
        expect($node.hasClass('selected')).to.be.true;
    });

    after(helpers.clearDOM);
});
