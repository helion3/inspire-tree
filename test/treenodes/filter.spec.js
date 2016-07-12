'use strict';

describe('TreeNodes.prototype.filter', function() {
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Create tree
        tree = new InspireTree({
            target: $('.tree'),
            data: [{
                text: 'A',
                id: 1
            }, {
                text: 'B',
                id: 2
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().filter).to.be.a('function');
        expect(tree.filter).to.be.a('function');
    });


    it('returns matches for custom booleans', function() {
        tree.node(2).select();

        expect(tree.filter('selected')).to.have.length(1);
    });

    after(helpers.clearDOM);
});
