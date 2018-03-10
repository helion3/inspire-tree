const expect = require('chai').expect;
const InspireTree = require('../../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNodes extends Array.prototype.reverse', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A'
            }, {
                text: 'B'
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().reverse).to.be.a('function');
        expect(tree.reverse).to.be.a('function');
    });

    it('reverses node order', function() {
        const nodes = tree.nodes().reverse();

        expect(nodes).to.have.length(2);
        expect(nodes[0].text).to.equal('B');
        expect(nodes[1].text).to.equal('A');
    });
});
