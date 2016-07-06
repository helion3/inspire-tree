'use strict';

describe('TreeNode.prototype.state', function() {
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
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).state).to.be.a('function');
    });

    it('returns false when not selected', function() {
        expect(tree.node(1).state('selected')).to.be.false;
    });

    it('returns true when selected', function() {
        var node = tree.node(1);

        node.select();
        expect(node.state('selected')).to.be.true;
    });

    it('sets selected to false', function() {
        var node = tree.node(1);

        node.state('selected', false);
        expect(node.state('selected')).to.be.false;
    });

    after(helpers.clearDOM);
});
