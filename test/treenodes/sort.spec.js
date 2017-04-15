var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.sort', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'D',
                id: 1
            }, {
                text: 'C'
            }, {
                text: 'a'
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().sort).to.be.a('function');
        expect(tree.sort).to.be.a('function');
    });

    it('sorts alphabetically', function() {
        var nodes = tree.nodes();
        expect(nodes[0].text).to.equal('D');
        expect(nodes[1].text).to.equal('C');
        expect(nodes[2].text).to.equal('a');

        // Sort
        tree.nodes().sort('text');

        // Check original model
        nodes = tree.nodes();
        expect(nodes[0].text).to.equal('C');
        expect(nodes[1].text).to.equal('D');
        expect(nodes[2].text).to.equal('a');
    });

    it('sorts children alphabetically', function() {
        // Create tree
        tree = new InspireTree({
            sort: 'text',
            data: [{
                text: 'D',
                id: 1,
                children: [{
                    text: 'Z'
                }, {
                    text: 'B'
                }, {
                    text: 'A'
                }]
            }]
        });

        var nodes = tree.node(1).children;
        expect(nodes[0].text).to.equal('A');
        expect(nodes[1].text).to.equal('B');
        expect(nodes[2].text).to.equal('Z');
    });
});
