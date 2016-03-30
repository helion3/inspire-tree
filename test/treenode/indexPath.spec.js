'use strict';

describe('TreeNode.prototype.indexPath', function() {
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
                    id: 11,
                    text: 'AA'
                }]
            }, {
                text: 'B',
                id: 2
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).indexPath).to.be.a('function');
    });

    it('returns the correct index path', function() {
        expect(tree.node(1).indexPath()).to.equal('0');
        expect(tree.node(11).indexPath()).to.equal('0.0');
    });

    after(helpers.clearDOM);
});
