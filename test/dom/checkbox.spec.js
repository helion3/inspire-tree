'use strict';

describe('checkboxes', function() {
    var tree;

    before(function() {
        helpers.createTreeContainer();

        tree = new InspireTree({
            target: '.tree',
            selection: {
                mode: 'checkbox'
            },
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
        tree.node(2).select();

        expect(tree.node(1).selected()).to.be.true;
        expect(tree.node(3).selected()).to.be.true;
    });

    it('parent becomes indeterminate when unselected child added', function() {
        tree.node(2).addChild({
            text: 'D',
            id: 4
        });

        expect(tree.node(2).selected()).to.be.false;
        expect(tree.node(2).itree.state.indeterminate).to.be.true;

        expect(tree.node(1).selected()).to.be.false;
        expect(tree.node(1).itree.state.indeterminate).to.be.true;
    });

    it('parent deselects when no children selected', function() {
        tree.node(2).select();

        // Deselect children
        tree.nodes([3, 4]).deselect();

        expect(tree.node(1).selected()).to.be.false;
        expect(tree.node(1).itree.state.indeterminate).to.be.false;
        expect(tree.node(3).selected()).to.be.false;
    });

    after(helpers.clearDOM);
});
