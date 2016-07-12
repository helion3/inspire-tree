'use strict';

describe('Tree.clearSearch', function() {
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Create tree
        tree = new InspireTree({
            target: $('.tree'),
            selection: {
                autoDeselect: false
            },
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
        expect(tree.clearSearch).to.be.a('function');
    });

    // Note: logic is covered by search spec

    after(helpers.clearDOM);
});
