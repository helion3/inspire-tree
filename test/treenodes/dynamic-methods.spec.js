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
        expect(tree.nodes().blur).to.be.a('function');
        expect(tree.nodes().blurDeep).to.be.a('function');
    });

    it('"clean"', function() {
        expect(tree.nodes().clean).to.be.a('function');
    });

    it('"collapse"', function() {
        expect(tree.nodes().collapse).to.be.a('function');
        expect(tree.nodes().collapseDeep).to.be.a('function');
    });

    it('"deselect"', function() {
        expect(tree.nodes().deselect).to.be.a('function');
        expect(tree.nodes().deselectDeep).to.be.a('function');
    });

    it('"expand"', function() {
        expect(tree.nodes().expand).to.be.a('function');
        expect(tree.nodes().expandDeep).to.be.a('function');
    });

    it('"expandParents"', function() {
        expect(tree.nodes().expandParents).to.be.a('function');
    });

    it('"hide"', function() {
        expect(tree.nodes().hide).to.be.a('function');
        expect(tree.nodes().hideDeep).to.be.a('function');
    });

    it('"restore"', function() {
        expect(tree.nodes().restore).to.be.a('function');
    });

    it('"select"', function() {
        expect(tree.nodes().select).to.be.a('function');
        expect(tree.nodes().selectDeep).to.be.a('function');
    });

    it('"setSelectable"', function() {
        expect(tree.nodes().setSelectable).to.be.a('function');
        expect(tree.nodes().setSelectableDeep).to.be.a('function');
    });

    it('"show"', function() {
        expect(tree.nodes().show).to.be.a('function');
        expect(tree.nodes().showDeep).to.be.a('function');
    });

    it('"softRemove"', function() {
        expect(tree.nodes().softRemove).to.be.a('function');
    });

    after(helpers.clearDOM);
});
