'use strict';

describe('TreeNode.prototype.toggleCollapse', function() {
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
                    text: 'B'
                }]
            }]
        });
    });

    var node;

    it('exists', function() {
        node = tree.node(1);
        expect(node.toggleCollapse).to.be.a('function');
    });

    it('expands node', function() {
        node.toggleCollapse();

        expect(node.collapsed()).to.be.false;
    });

    it('collapses node', function() {
        node.toggleCollapse();

        expect(node.collapsed()).to.be.true;
    });

    after(helpers.clearDOM);
});
