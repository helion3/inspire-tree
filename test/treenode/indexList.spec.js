const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.indexList', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    id: 11,
                    text: 'AA'
                }]
            }, {
                text: 'B',
                id: 2
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).indexList).to.be.a('function');
    });

    it('returns the correct index path', function() {
        expect(tree.node(1).indexList()[0]).to.equal(0);
        expect(tree.node(11).indexList()[1]).to.equal(0);
    });
});
