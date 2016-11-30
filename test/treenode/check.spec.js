'use strict';

describe('TreeNode.prototype.check', function() {
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Create tree
        tree = new InspireTree({
            target: $('.tree'),
            data: [{
                text: 'A',
                id: 1
            }, {
                text: 'B',
                id: 2
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).check).to.be.a('function');
    });

    it('checks the node', function() {
        var node = tree.node(1);
        expect(node.checked()).to.be.false;

        node.check();
        expect(node.checked()).to.be.true;
    });

    after(helpers.clearDOM);
});
