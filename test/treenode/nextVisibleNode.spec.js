'use strict';

describe('TreeNode.prototype.nextVisibleNode', function() {
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
            }, {
                text: 'B',
                id: 4
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).nextVisibleNode).to.be.a('function');
    });

    it('finds sibling of parent when visible child/sibling nodes unavailable', function() {
        tree.node(3).hide();

        expect(tree.node(2).nextVisibleNode().id).to.equal('4');
    });

    after(helpers.clearDOM);
});
