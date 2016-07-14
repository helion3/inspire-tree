'use strict';

describe('TreeNodes.prototype.editable', function() {
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Create tree
        tree = new InspireTree({
            target: $('.tree'),
            editable: true,
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'B'
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().editable).to.be.a('function');
        expect(tree.editable).to.be.a('function');
    });

    it('returns editable nodes', function() {
        expect(tree.editable()).to.have.length(2);

        tree.node(1).state('editable', false);
        expect(tree.editable()).to.have.length(1);
    });

    after(helpers.clearDOM);
});
