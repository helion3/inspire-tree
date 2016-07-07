'use strict';

describe('TreeNodes.prototype.expandParents', function() {
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
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().expandParents).to.be.a('function');
    });

    it('returns a promise', function() {
        var node = tree.node(1);
        expect(node.expanded()).to.be.false;

        node.getChildren().expandParents();
        expect(node.expanded()).to.be.true;
    });

    after(helpers.clearDOM);
});
