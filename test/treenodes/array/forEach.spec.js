var expect = require('chai').expect;
var InspireTree = require('../../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNodes extends Array.prototype.forEach', function() {
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
        expect(tree.nodes().forEach).to.be.a('function');
        expect(tree.forEach).to.be.a('function');
    });

    it('iterates nodes', function() {
        var count = 0;

        tree.nodes().forEach(function() {
            count++;
        });

        expect(count).to.equal(2);
    });
});
