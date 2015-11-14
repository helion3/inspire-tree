'use strict';

describe('TreeNode.prototype.expandParents', function() {
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
                    text: 'AA',
                    id: 2,
                    children: [{
                        text: 'AAA',
                        id: 3
                    }]
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.getNode(1).expandParents).to.be.a('function');
    });

    it('expands parents', function() {
        var node = tree.getNode(3);
        node.expandParents();

        expect(tree.getNode(1).collapsed()).to.be.false;
        expect(tree.getNode(2).collapsed()).to.be.false;
    });

    it('does not expand self', function() {
        expect(tree.getNode(3).collapsed()).to.be.true;
    });

    after(helpers.clearDOM);
});
