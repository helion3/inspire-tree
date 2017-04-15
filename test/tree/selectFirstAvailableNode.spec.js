var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('Tree.selectFirstAvailableNode', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
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
        expect(tree.selectFirstAvailableNode).to.be.a('function');
    });

    it('selects the first visible node', function() {
        tree.node(1).hide();
        tree.selectFirstAvailableNode();

        expect(tree.node(2).selected()).to.be.true;
    });
});
