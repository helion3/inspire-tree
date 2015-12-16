'use strict';

describe('TreeNode.prototype.available', function() {
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
                    id: 2
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).available).to.be.a('function');
    });

    it('returns true when visible', function() {
        expect(tree.node(1).available()).to.be.true;
    });

    it('returns true when parent collapsed', function() {
        expect(tree.node(2).available()).to.be.true;
    });

    it('returns false when hidden', function() {
        var node = tree.node(1);
        node.hide();

        expect(node.available()).to.be.false;
    });

    after(helpers.clearDOM);
});
