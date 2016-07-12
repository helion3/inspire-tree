'use strict';

describe('TreeNodes.prototype.loading', function() {
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
        expect(tree.nodes().loading).to.be.a('function');
        expect(tree.loading).to.be.a('function');
    });

    it('returns loading nodes', function() {
        expect(tree.loading()).to.have.length(0);

        tree.node(1).state('loading', true);
        expect(tree.loading()).to.have.length(1);
    });

    after(helpers.clearDOM);
});
