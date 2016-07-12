'use strict';

describe('Tree.canAutoDeselect', function() {
    var $tree;
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Query DOM
        $tree = $('.tree');

        // Create tree
        tree = new InspireTree({
            target: $tree,
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
        expect(tree.canAutoDeselect).to.be.a('function');
    });

    it('returns configured value', function() {
        expect(tree.canAutoDeselect()).to.be.false;

        tree.config.selection.autoDeselect = true;
        expect(tree.canAutoDeselect()).to.be.true;
    });

    after(helpers.clearDOM);
});
