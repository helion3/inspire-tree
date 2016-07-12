'use strict';

describe('TreeNodes.prototype.expanded', function() {
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
                id: 1,
                children: [{
                    text: 'AA'
                }]
            }, {
                text: 'B',
                children: [{
                    text: 'BB'
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().expanded).to.be.a('function');
        expect(tree.expanded).to.be.a('function');
    });

    it('returns expanded nodes', function() {
        tree.node(1).expand();

        expect(tree.expanded()).to.have.length(1);
    });

    after(helpers.clearDOM);
});
