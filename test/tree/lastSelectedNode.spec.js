var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('Tree.lastSelectedNode', function() {
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
        expect(tree.lastSelectedNode).to.be.a('function');
    });

    it('returns undefined before anything is selected', function() {
        expect(tree.lastSelectedNode()).to.be.undefined;
    });

    it('returns selected node', function() {
        tree.node(1).select();

        expect(tree.lastSelectedNode().id).to.equal('1');
    });

    it('returns last selected node', function() {
        tree.node(2).select();

        expect(tree.lastSelectedNode().id).to.equal('2');
    });
});
