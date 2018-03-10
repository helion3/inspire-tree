const expect = require('chai').expect;
const InspireTree = require('../../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNodes extends Array.prototype.map', function() {
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
        expect(tree.nodes().map).to.be.a('function');
        expect(tree.every).to.be.a('function');
    });

    it('map nodes into a new collection', function() {
        const newNodes = tree.nodes().map(function(node) {
            node.id = node.text;
            return node;
        });

        expect(newNodes).to.have.length(2);
        expect(newNodes[0].id).to.equal('A');
    });
});
