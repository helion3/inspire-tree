'use strict';

describe('TreeNode.prototype.nextVisibleChildNode', function() {
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
        expect(tree.getNode(1).nextVisibleChildNode).to.be.a('function');
    });

    it('returns undefined when node collapsed', function() {
        expect(tree.getNode(1).nextVisibleChildNode()).to.be.undefined;
        tree.getNode(1).expand();
    });

    it('returns first node', function() {
        expect(tree.getNode(1).nextVisibleChildNode().id).to.equal('2');
    });

    it('returns second node when first hidden', function() {
        tree.getNode(2).hide();
        expect(tree.getNode(1).nextVisibleChildNode().id).to.equal('3');
    });

    after(helpers.clearDOM);
});
