var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.stateDeep', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'B',
                    id: 2
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().stateDeep).to.be.a('function');
        expect(tree.stateDeep).to.be.a('function');
    });

    it('returns false when not selected', function() {
        expect(tree.node(2).state('selected')).to.be.false;
    });

    it('returns true when selected', function() {
        tree.selectDeep();
        expect(tree.node(2).state('selected')).to.be.true;
    });
});
