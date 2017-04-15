var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.lastDeepestVisibleChild', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
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
});
