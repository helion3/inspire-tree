'use strict';

describe('TreeNodes.prototype.softRemove', function() {
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
        expect(tree.nodes().softRemove).to.be.a('function');
        expect(tree.softRemove).to.be.a('function');
    });

    it('soft-removes a node', function() {
        var node = tree.node(1);
        expect(node.removed()).to.be.false;

        node.softRemove();

        expect(tree.nodes()).to.have.length(1);
        expect(node.removed()).to.be.true;
    });

    after(helpers.clearDOM);
});
