const expect = require('chai').expect;
const InspireTree = require('../../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNodes extends Array.prototype.filter', function() {
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
        expect(tree.nodes().filter).to.be.a('function');
        expect(tree.filter).to.be.a('function');
    });

    it('returns only nodes that pass testing', function() {
        const matches = tree.nodes().filter(function(node) {
            return parseInt(node.id, 10) % 2 === 0;
        });

        expect(matches).to.have.length(1);
        expect(matches[0].id).to.equal(2);
    });
});
