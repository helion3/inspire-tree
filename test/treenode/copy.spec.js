'use strict';

describe('TreeNode.prototype.copy', function() {
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Create tree
        tree = new InspireTree({
            target: $('.tree'),
            data: [{
                data: 'A',
                id: 1
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).copy().to).to.be.a('function');
    });

    after(helpers.clearDOM);
});
