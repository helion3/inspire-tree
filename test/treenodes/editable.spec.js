var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.editable', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            editable: true,
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'B'
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().editable).to.be.a('function');
        expect(tree.editable).to.be.a('function');
    });

    it('returns editable nodes', function() {
        expect(tree.editable()).to.have.length(2);

        tree.node(1).state('editable', false);
        expect(tree.editable()).to.have.length(1);
    });
});
