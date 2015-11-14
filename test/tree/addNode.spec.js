'use strict';

describe('TreeNode.prototype.addNode', function() {
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
                children: []
            }]
        });
    });

    it('exists', function() {
        expect(tree.addNode).to.be.a('function');
    });

    it('adds a new node', function() {
        expect(tree.getNodes()).to.have.length(1);
        expect($tree.find('li')).to.have.length(1);

        tree.addNode({ text: 'New' });

        expect(tree.getNodes()).to.have.length(2);
        expect($tree.find('li')).to.have.length(2);
    });

    after(helpers.clearDOM);
});
