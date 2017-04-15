var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('Tree.emit', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: []
        });
    });

    it('exists', function() {
        expect(tree.emit).to.be.a('function');
    });

    // Note: logic isn't covered since it's an external library
});
