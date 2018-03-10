const expect = require('chai').expect;
const InspireTree = require('../../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNodes extends Array.prototype.some', function() {
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
        expect(tree.nodes().some).to.be.a('function');
        expect(tree.some).to.be.a('function');
    });

    it('returns true when at least one node passes the test', function() {
        const res = tree.nodes().some(function() {
            return true;
        });

        expect(res).to.be.true;
    });
});
