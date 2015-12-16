'use strict';

describe('TreeNode.prototype.getParents', function() {
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
                    text: 'AA',
                    id: 2,
                    children: [{
                        text: 'AAA',
                        id: 3
                    }]
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).getParents).to.be.a('function');
    });

    it('returns empty array for root node', function() {
        expect(tree.node(1).getParents()).to.have.length(0);
    });

    it('returns both parents for child node', function() {
        var parents = tree.node(3).getParents();

        expect(parents).to.have.length(2);
        expect(parents[0].id).to.equal('2');
        expect(parents[1].id).to.equal('1');
    });

    after(helpers.clearDOM);
});
