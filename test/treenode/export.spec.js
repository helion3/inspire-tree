'use strict';

describe('TreeNode.prototype.export', function() {
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Create tree
        tree = new InspireTree({
            target: '.tree',
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'B'
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.getNode(1).export).to.be.a('function');
    });

    it('remove itree data when exporting node', function() {
        var node = tree.getNode(1);

        expect(node.itree).to.be.an('object');
        expect(node.itree.state).to.be.an('object');
        expect(node.hasChildren()).to.be.true;
        expect(node.constructor.name).to.equal('TreeNode');

        var newNode = node.export();

        expect(newNode.itree).to.be.undefined;
        expect(newNode.constructor.name).to.equal('Object');
        expect(Array.isArray(newNode.children)).to.be.true;
    });

    after(helpers.clearDOM);
});
