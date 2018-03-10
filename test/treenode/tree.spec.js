var expect = require('chai').expect;
var InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.tree', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).tree).to.be.a('function');
    });

    it('returns tree instance', function() {
        expect(tree === tree.node(1).tree()).to.be.true;
    });
});
