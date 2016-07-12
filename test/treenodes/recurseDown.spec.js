'use strict';

describe('TreeNodes.prototype.recurseDown', function() {
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
            }, {
                text: 'B'
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().recurseDown).to.be.a('function');
        expect(tree.recurseDown).to.be.a('function');
    });

    it('recurse down treenodes and children', function() {
        var count = 0;

        tree.nodes().recurseDown(function() {
            count++;
        });

        expect(count).to.equal(4);
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
