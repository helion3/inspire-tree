'use strict';

describe('TreeNodes.prototype.editing', function() {
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
        expect(tree.nodes().editing).to.be.a('function');
        expect(tree.editing).to.be.a('function');
    });

    it('returns nodes in edit mode', function() {
        expect(tree.editing()).to.have.length(0);

        tree.node(1).state('editing', true);
        expect(tree.editing()).to.have.length(1);
    });

    after(helpers.clearDOM);
});
