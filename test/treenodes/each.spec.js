const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNodes.prototype.each', function() {
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
        expect(tree.nodes().each).to.be.a('function');
        expect(tree.each).to.be.a('function');
    });

    it('iterates nodes', function() {
        let count = 0;

        tree.nodes().each(function() {
            count++;
        });

        expect(count).to.equal(2);
    });
});
