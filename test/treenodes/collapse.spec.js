'use strict';

describe('TreeNodes.prototype.collapse', function() {
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
        expect(tree.nodes().collapse).to.be.a('function');
        expect(tree.collapse).to.be.a('function');
    });

    it('collapses a node', function() {
        var node = tree.node(1);
        node.expand();
        expect(node.expanded()).to.be.true;

        tree.collapse();
        expect(node.expanded()).to.be.false;
    });

    after(helpers.clearDOM);
});
