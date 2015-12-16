'use strict';

describe('TreeNode.prototype.nextVisibleSiblingNode', function() {
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
            }, {
                text: 'C',
                id: 3
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).nextVisibleSiblingNode).to.be.a('function');
    });

    it('returns second node', function() {
        expect(tree.node(1).nextVisibleSiblingNode().id).to.equal('2');
    });

    it('returns undefined when last node hidden', function() {
        tree.node(3).hide();
        expect(tree.node(2).nextVisibleSiblingNode()).to.be.undefined;
    });

    after(helpers.clearDOM);
});
