var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.deepest', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'B',
                    company: 'Test'
                }]
            }, {
                text: 'C',
                company: 'Test'
            }, {
                text: 'D',
                company: 'Test',
                children: true
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().deepest).to.be.a('function');
        expect(tree.deepest).to.be.a('function');
    });

    it('returns only deepest nodes', function() {
        var deepest = tree.nodes().deepest();

        expect(deepest).to.have.length(2);
        expect(deepest[0].text).to.equal('B');
    });
});
