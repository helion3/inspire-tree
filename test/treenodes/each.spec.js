'use strict';

describe('TreeNodes.prototype.each', function() {
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
        expect(tree.nodes().each).to.be.a('function');
        expect(tree.each).to.be.a('function');
    });

    it('iterates nodes', function() {
        var count = 0;

        tree.nodes().each(function() {
            count++;
        });

        expect(count).to.equal(2);
    });

    after(helpers.clearDOM);
});
