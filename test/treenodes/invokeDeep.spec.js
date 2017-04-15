var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.invokeDeep', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            selection: {
                autoDeselect: false,
                multiple: true
            },
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'AA',
                    id: 2,
                    children: [{
                        text: 'AAA',
                        id: 3
                    }]
                }]
            }, {
                text: 'B'
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().invokeDeep).to.be.a('function');
        expect(tree.invokeDeep).to.be.a('function');
    });

    it('invokes method deeply', function() {
        tree.invokeDeep('select');

        expect(tree.selected()).to.have.length(4);
    });

    it('invokes multiple methods on each node', function() {
        tree.invokeDeep(['deselect', 'expand']);

        expect(tree.selected()).to.have.length(0);
        expect(tree.expanded()).to.have.length(2);
    });
});
