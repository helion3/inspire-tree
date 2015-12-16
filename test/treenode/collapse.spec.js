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
            }, {
                text: 'B',
                id: 2,
                itree: {
                    state: {
                        collapsed: false
                    }
                }
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).collapse).to.be.a('function');
    });

    it('collapses children via click', function() {
        var node = tree.node(1);
        node.expand();

        var $node = $('[data-uid="' + node.id + '"]');
        expect($node.hasClass('collapsed')).to.be.false;

        $node.find('> div .toggle').click();
        expect($node.hasClass('collapsed')).to.be.true;
    });

    it('collapses children via api', function() {
        var node = tree.node(1);
        node.expand();

        var $node = $('[data-uid="' + node.id + '"]');
        expect($node.hasClass('collapsed')).to.be.false;

        node.collapse();
        expect($node.hasClass('collapsed')).to.be.true;
    });

    it('allows collapse when children empty', function() {
        var node = tree.node(2);

        node.collapse();
        expect(node.collapsed()).to.be.true;
    });

    after(helpers.clearDOM);
});
