const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.lastDeepestVisibleChild', function() {
    let tree;

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
