'use strict';

describe('TreeNode.prototype.hide', function() {
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
        expect(tree.node(1).hide).to.be.a('function');
    });

    it('hides node', function() {
        var node = tree.node(1);

        var $node = $('[data-uid="' + node.id + '"]');
        expect($node.hasClass('hidden')).to.be.false;
        expect(node.hidden()).to.be.false;

        node.hide();
        expect($node.hasClass('hidden')).to.be.true;
        expect(node.hidden()).to.be.true;
    });

    after(helpers.clearDOM);
});
