var expect = require('chai').expect;
var InspireTree = require('../../../build/inspire-tree');

describe('TreeNodes extends Array.prototype.some', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1
            }, {
                text: 'B',
                id: 2
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().some).to.be.a('function');
        expect(tree.some).to.be.a('function');
    });

    it('returns true when at least one node passes the test', function() {
        var res = tree.nodes().some(function() {
            return true;
        });

        expect(res).to.be.true;
    });
});
