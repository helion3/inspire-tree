var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.insertAt', function() {
    var tree;
    var tree2;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: []
        });

        tree2 = new InspireTree({
            data: []
        });
    });

    afterEach(function() {
        tree.removeAll();
        tree2.removeAll();
    });

    it('exists', function() {
        expect(tree.nodes().insertAt).to.be.a('function');
        expect(tree.insertAt).to.be.a('function');
    });

    it('doesn\'t override children with a boolean', function() {
        tree.addNode({
            text: 'A',
            id: 1,
            children: [{
                text: 'AA'
            }]
        });

        tree2.addNode({
            text: 'A',
            id: 1,
            children: true
        });

        tree2.node(1).copy().to(tree);

        expect(tree.node(1).hasChildren()).to.be.true;
    });

    it('inserts a new node at a given index', function() {
        tree.addNodes([{
            text: 'A',
            id: 1
        }, {
            text: 'B',
            id: 2
        }]);

        tree.insertAt(1, {
            text: 'C',
            id: 3
        });

        expect(tree.nodes()[0].id).to.equal('1');
        expect(tree.nodes()[1].id).to.equal('3');
        expect(tree.nodes()[2].id).to.equal('2');
    });
});
