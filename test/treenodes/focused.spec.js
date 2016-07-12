'use strict';

describe('TreeNodes.prototype.focused', function() {
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
        expect(tree.nodes().focused).to.be.a('function');
        expect(tree.focused).to.be.a('function');
    });

    it('returns focused root nodes', function() {
        expect(tree.focused()).to.have.length(0);

        tree.node(1).focus();

        expect(tree.focused()).to.have.length(1);
    });

    after(helpers.clearDOM);
});
