'use strict';

describe('TreeNode.prototype.hidden', function() {
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
        expect(tree.node(1).hidden).to.be.a('function');
    });

    it('returns false when visible', function() {
        expect(tree.node(1).hidden()).to.be.false;
    });

    it('returns true when hidden', function() {
        var node = tree.node(1);
        node.hide();

        expect(node.hidden()).to.be.true;
    });

    after(helpers.clearDOM);
});
