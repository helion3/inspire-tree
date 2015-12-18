'use strict';

describe('TreeNode.prototype.recurseDown', function() {
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
        expect(tree.node(1).recurseDown).to.be.a('function');
    });

    it('recurse down node and children', function() {
        var count = 0;

        tree.node(1).recurseDown(function() {
            count++;
        });

        expect(count).to.equal(3);
    });

    it('stops recursion when returning false', function() {
        var count = 0;

        tree.nodes().recurseDown(function() {
            count++;

            return !(count === 2);
        });

        expect(count).to.equal(2);
    });

    after(helpers.clearDOM);
});
