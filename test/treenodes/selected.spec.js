var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.selected', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().selected).to.be.a('function');
        expect(tree.selected).to.be.a('function');
    });

    it('returns an empty array when none selected', function() {
        expect(tree.selected()).to.have.length(0);
    });

    it('returns selected root node', function() {
        tree.node(1).select();

        expect(tree.selected()).to.have.length(1);
    });

    it('auto-selects a node when selection.require=true', function() {
        tree = new InspireTree({
            selection: {
                require: true
            },
            data: [{
                text: 'A',
                id: 1
            }]
        });

        expect(tree.selected()).to.have.length(1);
    });

    it('rejects deselect of only node when selection.require=true', function() {
        tree.node(1).deselect();

        expect(tree.selected()).to.have.length(1);
    });
});
