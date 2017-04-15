var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('Tree.enableDeselection', function() {
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
        expect(tree.enableDeselection).to.be.a('function');
    });

    it('prevents deselection when disabled', function() {
        tree.disableDeselection().nodes([1, 2]).select();
        expect(tree.node(1).selected()).to.be.true;
        expect(tree.node(2).selected()).to.be.true;
    });

    it('deselects nodes when enabled', function() {
        tree.enableDeselection().deselect();

        tree.node(1).select();
        expect(tree.node(1).selected()).to.be.true;

        tree.node(2).select();
        expect(tree.node(1).selected()).to.be.false;
        expect(tree.node(2).selected()).to.be.true;
    });
});
