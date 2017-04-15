var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('Tree.disableDeselection', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            selection: {
                multiple: true
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
        expect(tree.disableDeselection).to.be.a('function');
    });

    it('deselects node by default', function() {
        tree.node(1).select();
        expect(tree.node(1).selected()).to.be.true;

        tree.node(2).select();
        expect(tree.node(1).selected()).to.be.false;
        expect(tree.node(2).selected()).to.be.true;
    });

    it('prevents deselection', function() {
        tree.disableDeselection().nodes([1, 2]).select();
        expect(tree.node(1).selected()).to.be.true;
        expect(tree.node(2).selected()).to.be.true;
    });
});
