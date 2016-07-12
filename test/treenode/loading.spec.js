'use strict';

describe('TreeNode.prototype.loading', function() {
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
        expect(tree.node(1).loading).to.be.a('function');
    });

    it('returns true when loading', function() {
        var node = tree.node(1);
        expect(node.loading()).to.be.false;

        node.state('loading', true);
        expect(node.loading()).to.be.true;
    });

    after(helpers.clearDOM);
});
