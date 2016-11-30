'use strict';

describe('TreeNodes.prototype.checked', function() {
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
        expect(tree.nodes().checked).to.be.a('function');
        expect(tree.checked).to.be.a('function');
    });

    it('returns checked nodes', function() {
        expect(tree.checked()).to.have.length(0);

        tree.node(1).check();
        expect(tree.checked()).to.have.length(2);
    });

    after(helpers.clearDOM);
});
