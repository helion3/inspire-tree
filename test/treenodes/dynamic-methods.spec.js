'use strict';

describe('TreeNodes dynamic methods', function() {
    var $tree;
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Query DOM
        $tree = $('.tree');

        // Create tree
        tree = new InspireTree({
            target: $tree,
            data: [{
                text: 'A',
                id: 1
            }]
        });
    });

    it('"blur"', function() {
        expect(tree.getNodes().blur).to.be.a('function');
        expect(tree.getNodes().blurDeep).to.be.a('function');
    });

    it('"collapse"', function() {
        expect(tree.getNodes().collapse).to.be.a('function');
        expect(tree.getNodes().collapseDeep).to.be.a('function');
    });

    it('"deselect"', function() {
        expect(tree.getNodes().deselect).to.be.a('function');
        expect(tree.getNodes().deselectDeep).to.be.a('function');
    });

    it('"expand"', function() {
        expect(tree.getNodes().expand).to.be.a('function');
        expect(tree.getNodes().expandDeep).to.be.a('function');
    });

    it('"expandParents"', function() {
        expect(tree.getNodes().expandParents).to.be.a('function');
    });

    it('"hide"', function() {
        expect(tree.getNodes().hide).to.be.a('function');
        expect(tree.getNodes().hideDeep).to.be.a('function');
    });

    it('"restore"', function() {
        expect(tree.getNodes().restore).to.be.a('function');
        expect(tree.getNodes().restoreDeep).to.be.a('function');
    });

    it('"show"', function() {
        expect(tree.getNodes().show).to.be.a('function');
        expect(tree.getNodes().showDeep).to.be.a('function');
    });

    it('"softRemove"', function() {
        expect(tree.getNodes().softRemove).to.be.a('function');
        expect(tree.getNodes().softRemoveDeep).to.be.a('function');
    });

    after(helpers.clearDOM);
});
