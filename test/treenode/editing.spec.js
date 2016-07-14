'use strict';

describe('TreeNode.prototype.editing', function() {
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Create tree
        tree = new InspireTree({
            target: $('.tree'),
            data: [{
                text: 'A',
                id: 1
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).editing).to.be.a('function');
    });

    it('returns true when in edit mode', function() {
        var node = tree.node(1);
        expect(node.editing()).to.be.false;

        node.state('editing', true);
        expect(node.editing()).to.be.true;
    });

    after(helpers.clearDOM);
});
