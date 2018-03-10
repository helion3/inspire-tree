const expect = require('chai').expect;
const InspireTree = require('../../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNodes extends Array.prototype.pop', function() {
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
        expect(tree.nodes().pop).to.be.a('function');
        expect(tree.pop).to.be.a('function');
    });

    it('pops the last element off and returns it', function() {
        const node = tree.nodes().pop();

        expect(tree.nodes()).to.have.length(1);
        expect(node.id).to.equal(2);
    });
});
