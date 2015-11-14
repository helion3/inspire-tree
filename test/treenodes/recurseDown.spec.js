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
        expect(tree.getNodes().recurseDown).to.be.a('function');
    });

    it('recurse down treenodes and children', function() {
        var count = 0;

        tree.getNodes().recurseDown(function(node) {
            count++;
            return node;
        });

        expect(count).to.equal(4);
    });

    after(helpers.clearDOM);
});
