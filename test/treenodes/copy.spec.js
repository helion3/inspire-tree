'use strict';

describe('TreeNodes.prototype.copy', function() {
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
        expect(tree.nodes().copy).to.be.a('function');
        expect(tree.copy).to.be.a('function');
    });

    // Note: logic is covered by copy-merges spec

    after(helpers.clearDOM);
});
