var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.expanded', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'AA'
                }]
            }, {
                text: 'B',
                children: [{
                    text: 'BB'
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().expanded).to.be.a('function');
        expect(tree.expanded).to.be.a('function');
    });

    it('returns expanded nodes', function() {
        tree.node(1).expand();

        expect(tree.expanded()).to.have.length(1);
    });
});
