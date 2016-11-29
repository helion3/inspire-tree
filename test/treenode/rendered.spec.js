'use strict';

describe('TreeNode.prototype.rendered', function() {
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
        expect(tree.node(1).rendered).to.be.a('function');
    });

    it('returns true when node has rendered', function() {
        expect(tree.node(1).rendered()).to.be.true;
    });

    after(helpers.clearDOM);
});
