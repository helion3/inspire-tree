'use strict';

describe('TreeNodes.prototype.expand', function() {
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
        expect(tree.nodes().expand).to.be.a('function');
        expect(tree.expand).to.be.a('function');
    });

    it('expands a node', function() {
        var node = tree.node(1);
        expect(node.expanded()).to.be.false;

        tree.expand();
        expect(node.expanded()).to.be.true;
    });

    after(helpers.clearDOM);
});
