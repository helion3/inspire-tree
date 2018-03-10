var expect = require('chai').expect;
var InspireTree = require('../../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNodes extends Array.prototype.every', function() {
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
        expect(tree.nodes().every).to.be.a('function');
        expect(tree.every).to.be.a('function');
    });

    it('returns true when all nodes pass the test', function() {
        var res = tree.nodes().every(function() {
            return true;
        });

        expect(res).to.be.true;
    });
});
