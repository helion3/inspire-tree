var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('Tree.removeAll', function() {
    it('removes all nodes', function() {
        var tree = new InspireTree({
            data: [{
                text: 'A'
            }]
        });

        expect(tree.nodes()).to.have.length(1);

        tree.removeAll();

        expect(tree.nodes()).to.have.length(0);
    });
});
