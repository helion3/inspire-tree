const expect = require('chai').expect;
const InspireTree = require('../../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNodes extends Array.prototype.push', function() {
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
        expect(tree.nodes().push).to.be.a('function');
        expect(tree.push).to.be.a('function');
    });

    it('pushes a node', function() {
        const node = tree.createNode({
            text: 'A',
            id: 1
        });

        tree.nodes().push(node);

        expect(tree.nodes()).to.have.length(2);
        expect(tree.nodes()[1].text).to.equal('A');
    });
});
