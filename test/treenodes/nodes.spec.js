'use strict';

describe('TreeNodes.prototype.nodes', function() {
    var $tree;
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Query DOM
        $tree = $('.tree');

        // Create tree
        tree = new InspireTree({
            target: $tree,
            data: [{
                text: 'A',
                id: 1
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
        expect(tree.nodes().nodes).to.be.a('function');
        expect(tree.nodes).to.be.a('function');
    });

    it('returns all nodes', function() {
        expect(tree.nodes()).to.have.length(3);
    });

    it('returns nodes matching IDs', function() {
        expect(tree.nodes([1, 3])).to.have.length(2);
    });

    after(helpers.clearDOM);
});
