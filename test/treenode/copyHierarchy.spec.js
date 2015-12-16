'use strict';

describe('TreeNode.prototype.copyHierarchy', function() {
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
                    text: 'B',
                    id: 2
                }, {
                    text: 'C'
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).copyHierarchy).to.be.a('function');
    });

    it('returns copy of parent with node as only child', function() {
        var hierarchy = tree.node(2).copyHierarchy();

        expect(hierarchy.constructor.name).to.equal('TreeNode');
        expect(hierarchy.id).to.equal('1');
        expect(hierarchy.children).to.have.length(1);
    });

    it('returns only hierarchy with excludeNode=true', function() {
        var hierarchy = tree.node(2).copyHierarchy(true);

        expect(hierarchy.constructor.name).to.equal('TreeNode');
        expect(hierarchy.id).to.equal('1');
        expect(hierarchy.children).to.be.undefined;
    });

    after(helpers.clearDOM);
});
