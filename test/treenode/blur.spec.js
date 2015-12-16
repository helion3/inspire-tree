'use strict';

describe('TreeNode.prototype.blur', function() {
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
        expect(tree.node(1).blur).to.be.a('function');
    });

    it('blurs via api', function() {
        var node = tree.node(1);
        node.focus();
        expect(node.focused()).to.be.true;

        node.blur();
        expect(node.focused()).to.be.false;
    });

    after(helpers.clearDOM);
});
