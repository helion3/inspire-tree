'use strict';

describe('TreeNode.prototype.expand', function() {
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
        expect(tree.node(1).expand).to.be.a('function');
    });

    it('returns a promise', function() {
        expect(tree.node(1).expand().then).to.be.a('function');
    });

    it('expands children via click', function() {
        var node = tree.node(1);
        node.collapse();

        var $node = $('[data-uid="' + node.id + '"]');
        expect($node.hasClass('collapsed')).to.be.true;

        $node.find('> div .toggle').click();
        expect($node.hasClass('collapsed')).to.be.false;
    });

    it('expands children via api', function() {
        var node = tree.node(1);
        node.collapse();

        var $node = $('[data-uid="' + node.id + '"]');
        expect($node.hasClass('collapsed')).to.be.true;

        node.expand();
        expect($node.hasClass('collapsed')).to.be.false;
    });

    after(helpers.clearDOM);
});
