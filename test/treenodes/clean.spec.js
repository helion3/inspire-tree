'use strict';

describe('TreeNodes.prototype.clean', function() {
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Create tree
        tree = new InspireTree({
            target: $('.tree'),
            data: [{
                data: 'A',
                id: 1
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().clean).to.be.a('function');
    });

    after(helpers.clearDOM);
});
