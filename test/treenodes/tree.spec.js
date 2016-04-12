'use strict';

describe('TreeNodes.prototype.tree', function() {
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
        expect(tree.nodes().tree).to.be.a('function');
    });

    it('returns tree instance', function() {
        expect(tree === tree.nodes().tree()).to.be.true;
    });

    after(helpers.clearDOM);
});
