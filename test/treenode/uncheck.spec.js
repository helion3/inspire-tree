'use strict';

describe('TreeNode.prototype.uncheck', function() {
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
        expect(tree.node(1).uncheck).to.be.a('function');
    });

    it('unchecks the node', function() {
        var node = tree.node(1);
        node.check();
        expect(node.checked()).to.be.true;

        node.uncheck();
        expect(node.checked()).to.be.false;
    });

    after(helpers.clearDOM);
});
