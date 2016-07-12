'use strict';

describe('Tree.emit', function() {
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Create tree
        tree = new InspireTree({
            target: $('.tree'),
            data: []
        });
    });

    it('exists', function() {
        expect(tree.emit).to.be.a('function');
    });

    // Note: logic isn't covered since it's an external library

    after(helpers.clearDOM);
});
