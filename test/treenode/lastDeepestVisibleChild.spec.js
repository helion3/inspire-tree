'use strict';

describe('TreeNode.prototype.lastDeepestVisibleChild', function() {
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Create tree
        tree = new InspireTree({
            target: $('.tree'),
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'AA',
                    children: [{
                        text: 'AAA'
                    }, {
                        text: 'B'
                    }]
                }]
            }]
        });

        tree.expandDeep();
    });

    it('exists', function() {
        expect(tree.node(1).lastDeepestVisibleChild).to.be.a('function');
    });

    it('returns last deepest child node', function() {
        expect(tree.node(1).lastDeepestVisibleChild().text).to.equal('B');
    });

    after(helpers.clearDOM);
});
