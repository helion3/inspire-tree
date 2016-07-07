'use strict';

describe('TreeNodes.prototype.context', function() {
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Create tree
        tree = new InspireTree({
            target: $('.tree'),
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
        expect(tree.nodes().context).to.be.a('function');
    });

    it('returns the tree as the root context', function() {
        expect(tree.nodes().context()).to.equal(tree);
    });

    it('returns parent node for a child context', function() {
        var node = tree.node(1);

        expect(node.getChildren().context()).to.equal(node);
    });

    after(helpers.clearDOM);
});
