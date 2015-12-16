'use strict';

describe('TreeNode.prototype.removed', function() {
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
        expect(tree.node(1).removed).to.be.a('function');
    });

    it('soft removes node', function() {
        var node = tree.node(1);
        node.softRemove();

        expect(node.removed()).to.be.true;
    });

    after(helpers.clearDOM);
});
