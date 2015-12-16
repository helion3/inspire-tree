'use strict';

describe('TreeNode.prototype.expanded', function() {
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
        expect(tree.node(1).expanded).to.be.a('function');
    });

    it('returns false when collapsed', function() {
        expect(tree.node(1).expanded()).to.be.false;
    });

    it('returns true when expanded', function() {
        var node = tree.node(1);
        node.expand();

        expect(node.expanded()).to.be.true;
    });

    after(helpers.clearDOM);
});
