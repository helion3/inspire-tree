'use strict';

describe('TreeNodes.prototype.hideDeep', function() {
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
        expect(tree.nodes().hideDeep).to.be.a('function');
        expect(tree.hideDeep).to.be.a('function');
    });

    it('hides all nodes', function() {
        var node = tree.node(2);
        expect(node.hidden()).to.be.false;

        tree.hideDeep();

        expect(node.hidden()).to.be.true;
    });

    after(helpers.clearDOM);
});
