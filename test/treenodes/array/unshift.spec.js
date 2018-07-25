const expect = require('chai').expect;
const InspireTree = require('../../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNodes extends Array.prototype.unshift', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'B',
                id: 2
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().unshift).to.be.a('function');
        expect(tree.unshift).to.be.a('function');
    });

    it('unshifts a node', function() {
        tree.nodes().unshift(tree.createNode({
            text: 'A'
        }));

        expect(tree.nodes()).to.have.length(2);
        expect(tree.nodes()[0].text).to.equal('A');
    });
});
