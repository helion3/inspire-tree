'use strict';

describe('TreeNode.prototype.recurseUp', function() {
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
        expect(tree.node(1).recurseUp).to.be.a('function');
    });

    it('recurse up self and all parents', function() {
        var count = 0;

        tree.node(3).recurseUp(function() {
            count++;
        });

        expect(count).to.equal(3);
    });

    it('stops recursion when returning false', function() {
        var count = 0;

        tree.node(3).recurseUp(function() {
            count++;

            return !(count === 1);
        });

        expect(count).to.equal(1);
    });

    after(helpers.clearDOM);
});
