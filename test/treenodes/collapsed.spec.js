'use strict';

describe('TreeNodes.prototype.collapsed', function() {
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Create tree
        tree = new InspireTree({
            target: $('.tree'),
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
        expect(tree.nodes().collapsed).to.be.a('function');
        expect(tree.collapsed).to.be.a('function');
    });

    it('returns collapsed nodes', function() {
        tree.node(1).expand();

        expect(tree.collapsed()).to.have.length(3);
    });

    after(helpers.clearDOM);
});
