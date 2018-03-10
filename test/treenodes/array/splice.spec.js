var expect = require('chai').expect;
var InspireTree = require('../../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNodes extends Array.prototype.splice', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A'
            }, {
                text: 'B'
            }, {
                text: 'C'
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().splice).to.be.a('function');
        expect(tree.splice).to.be.a('function');
    });

    it('splices a treenode into a given position', function() {
        var node = tree.nodes().pop();

        expect(tree.nodes()).to.have.length(2);
        expect(tree.nodes()[0].text).to.equal('A');
        expect(tree.nodes()[1].text).to.equal('B');

        tree.nodes().splice(0, 1, node);

        expect(tree.nodes()).to.have.length(2);
        expect(tree.nodes()[0].text).to.equal('C');
        expect(tree.nodes()[1].text).to.equal('B');
    });
});
