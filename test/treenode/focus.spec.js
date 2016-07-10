'use strict';

describe('TreeNode.prototype.focus', function() {
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
        expect(tree.node(1).focus).to.be.a('function');
    });

    it('focus via browser focus', function() {
        var node = tree.node(1);

        var $node = $('[data-uid="' + node.id + '"]');
        expect($node.hasClass('focused')).to.be.false;

        $node.find('> div .title').focus();
        expect($node.hasClass('focused')).to.be.true;
    });

    it('blurs other nodes on node change', function() {
        tree.node(2).focus();

        expect(tree.node(1).focused()).to.be.false;
    });

    it('focus via api', function() {
        var node = tree.node(1);

        var $node = $('[data-uid="' + node.id + '"]');
        expect($node.hasClass('focused')).to.be.false;

        node.focus();
        expect($node.hasClass('focused')).to.be.true;
    });

    after(helpers.clearDOM);
});
