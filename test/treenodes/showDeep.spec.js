'use strict';

describe('TreeNodes.prototype.showDeep', function() {
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
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().showDeep).to.be.a('function');
        expect(tree.showDeep).to.be.a('function');
    });

    it('shows all nodes', function() {
        tree.hideDeep();

        var nodeA = tree.node(1);
        var nodeB = tree.node(2);

        expect(nodeA.hidden()).to.be.true;
        expect(nodeB.hidden()).to.be.true;

        tree.showDeep();
        expect(nodeA.hidden()).to.be.false;
        expect(nodeB.hidden()).to.be.false;
    });

    after(helpers.clearDOM);
});
