const expect = require('chai').expect;
const InspireTree = require('../../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNodes extends Array.prototype.every', function() {
    let tree;

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
        const res = tree.nodes().every(function() {
            return true;
        });

        expect(res).to.be.true;
    });
});
