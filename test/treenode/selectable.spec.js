'use strict';

describe('TreeNode.prototype.selectable', function() {
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
                id: 2,
                itree: {
                    state: {
                        selectable: false
                    }
                }
            }]
        });
    });

    it('exists', function() {
        expect(tree.getNode(1).selectable).to.be.a('function');
    });

    it('returns true for default nodes', function() {
        expect(tree.getNode(1).selectable()).to.be.true;
    });

    it('returns false for unselectable node', function() {
        expect(tree.getNode(2).selectable()).to.be.false;
    });

    it('does not select unselectable node', function() {
        var node = tree.getNode(2);
        node.select();

        expect(node.selected()).to.be.false;
    });

    after(helpers.clearDOM);
});
