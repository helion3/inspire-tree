var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.concat', function() {
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
        expect(tree.nodes().concat).to.be.a('function');
        expect(tree.concat).to.be.a('function');
    });

    it('combines two tree nodes arrays into one', function() {
        var original = tree.nodes();
        var clone = original.clone();
        var combined = clone.concat(original);

        expect(tree.isTreeNodes(combined)).to.be.true;
        expect(original).to.have.length(1);
        expect(clone).to.have.length(1);
        expect(combined).to.have.length(2);
    });
});
