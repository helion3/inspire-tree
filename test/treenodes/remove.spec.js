'use strict';

describe('TreeNodes.prototype.remove', function() {
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
                    text: 'B',
                    id: 2
                }]
            }, {
                text: 'C'
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().remove).to.be.a('function');
        expect(tree.remove).to.be.a('function');
    });

    it('removes a node', function() {
        var node = tree.node(1);

        expect(node.hasChildren()).to.be.true;

        node.children.remove(tree.node(2));

        expect(node.hasChildren()).to.be.false;
    });

    after(helpers.clearDOM);
});
