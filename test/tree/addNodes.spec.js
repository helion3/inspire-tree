var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('Tree.addNodes', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: []
            }]
        });
    });

    it('exists', function() {
        expect(tree.addNodes).to.be.a('function');
    });

    it('adds new nodes', function() {
        expect(tree.nodes()).to.have.length(1);

        tree.addNodes([{
            text: 'B'
        }, {
            text: 'C'
        }]);

        expect(tree.nodes()).to.have.length(3);
    });
});
