var expect = require('chai').expect;
var InspireTree = require('../../../build/inspire-tree');

describe('TreeNodes extends Array.prototype.reduceRight', function() {
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
        expect(tree.nodes().reduceRight).to.be.a('function');
        expect(tree.reduceRight).to.be.a('function');
    });

    it('right-reduces nodes to an array of text', function() {
        var res = tree.nodes().reduceRight(function(a, b) {
            a.push(b.text);

            return a;
        }, []);

        expect(res).to.have.length(3);
        expect(res[0]).to.equal('C');
        expect(res[1]).to.equal('B');
        expect(res[2]).to.equal('A');
    });
});
