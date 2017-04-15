var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.clean', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                data: 'A',
                id: 1
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().clean).to.be.a('function');
    });
});
