'use strict';

describe('TreeNode.prototype.nextVisibleAncestralSiblingNode', function() {
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Create tree
        tree = new InspireTree({
            target: $('.tree'),
            data: [{
                text: 'A',
                children: [{
                    text: 'AA',
                    children: [{
                        text: 'AAA',
                        id: 2
                    }]
                }]
            }, {
                text: 'B'
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(2).nextVisibleAncestralSiblingNode).to.be.a('function');
    });

    it('returns second root node', function() {
        expect(tree.node(2).nextVisibleAncestralSiblingNode().text).to.equal('B');
    });

    after(helpers.clearDOM);
});
