'use strict';

describe('TreeNodes.prototype.show', function() {
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Create tree
        tree = new InspireTree({
            target: $('.tree'),
            data: [{
                text: 'A',
                id: 1
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().show).to.be.a('function');
        expect(tree.show).to.be.a('function');
    });

    it('shows root nodes', function() {
        var node = tree.node(1);

        node.hide();
        expect(node.hidden()).to.be.true;

        tree.show();
        expect(node.hidden()).to.be.false;
    });

    after(helpers.clearDOM);
});
