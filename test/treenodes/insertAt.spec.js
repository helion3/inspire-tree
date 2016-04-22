'use strict';

describe('TreeNodes.prototype.insertAt', function() {
    var tree;
    var tree2;

    before(function() {
        helpers.createTreeContainer();
        helpers.createTreeContainer('tree2');

        // Create tree
        tree = new InspireTree({
            target: $('.tree'),
            data: []
        });

        tree2 = new InspireTree({
            target: '.tree2',
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

    after(helpers.clearDOM);
});
