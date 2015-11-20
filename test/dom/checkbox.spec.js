'use strict';

describe('checkboxes', function() {
    var tree;

    before(function() {
        helpers.createTreeContainer();

        tree = new InspireTree({
            target: '.tree',
            checkbox: true,
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'B',
                    id: 2,
                    children: [{
                        text: 'C',
                        id: 3
                    }]
                }]
            }]
        });
    });

    it('selects parent and children when node selected', function() {
        tree.getNode(2).select();

        expect(tree.getNode(1).selected()).to.be.true;
        expect(tree.getNode(3).selected()).to.be.true;
    });

    it('parent becomes indeterminate when unselected child added', function() {
        tree.getNode(2).addChild({
            text: 'D',
            id: 4
        });

        expect(tree.getNode(1).selected()).to.be.false;
        expect(tree.getNode(1).itree.state.indeterminate).to.be.true;
    });

    it('parent deselects when no children selected', function() {
        tree.getNode(2).deselect();

        expect(tree.getNode(1).selected()).to.be.false;
        expect(tree.getNode(1).itree.state.indeterminate).to.be.false;
        expect(tree.getNode(3).selected()).to.be.false;
    });

    after(helpers.clearDOM);
});
