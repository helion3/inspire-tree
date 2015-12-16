'use strict';

describe('TreeNode.prototype.hasVisibleChildren', function() {
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
                    id: 11
                }]
            }, {
                text: 'B',
                id: 2
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).hasVisibleChildren).to.be.a('function');
    });

    it('returns true for parent with visible children', function() {
        expect(tree.node(1).hasVisibleChildren()).to.be.true;
    });

    it('returns false for parent without children', function() {
        expect(tree.node(2).hasVisibleChildren()).to.be.false;
    });

    it('returns false for parent with one hidden child', function() {
        tree.node(11).hide();

        expect(tree.node(1).hasVisibleChildren()).to.be.false;
    });

    it('returns true for parent with one visible, one hidden child', function() {
        tree.node(1).addChild({
            text: 'New'
        });

        expect(tree.node(1).hasVisibleChildren()).to.be.true;
    });

    after(helpers.clearDOM);
});
