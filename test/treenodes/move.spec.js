var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.move', function() {
    var tree;

    before(function() {
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: []
            }, {
                text: 'B',
                id: 2
            }, {
                text: 'C',
                id: 3
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().move).to.be.a('function');
        expect(tree.move).to.be.a('function');
    });

    it('moves a node to a specific index', function() {
        expect(tree.nodes()[0].id).to.equal('1');
        expect(tree.nodes()[1].id).to.equal('2');
        expect(tree.nodes()[2].id).to.equal('3');

        tree.nodes().move(1, 0);

        expect(tree.nodes()[0].id).to.equal('2');
        expect(tree.nodes()[1].id).to.equal('1');
        expect(tree.nodes()[2].id).to.equal('3');
    });

    it('moves a node to a specific index', function() {
        tree.nodes().move(0, 2);

        expect(tree.nodes()[0].id).to.equal('1');
        expect(tree.nodes()[1].id).to.equal('3');
        expect(tree.nodes()[2].id).to.equal('2');
    });

    it('moves a node to another collection', function() {
        var node = tree.node(1);

        expect(tree.nodes()).to.have.length(3);
        expect(node.children).to.have.length(0);

        tree.nodes().move(2, 0, node.children);

        expect(tree.nodes()).to.have.length(2);
        expect(node.children).to.have.length(1);
        expect(node.children[0].id).to.equal('2');
    });
});
