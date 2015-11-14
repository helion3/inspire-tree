'use strict';

describe('TreeNode.prototype.previousVisibleNode', function() {
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
                    id: 2
                }, {
                    text: 'AA2',
                    id: 3
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.getNode(1).previousVisibleNode).to.be.a('function');
    });

    it('finds previous sibling node', function() {
        tree.getNode(1).expand();

        expect(tree.getNode(3).previousVisibleNode().id).to.equal('2');
    });

    it('finds parent when sibling hidden', function() {
        tree.getNode(2).hide();

        expect(tree.getNode(3).previousVisibleNode().id).to.equal('1');
    });

    after(helpers.clearDOM);
});
