const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.copy', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                data: 'A',
                id: 1
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).copy).to.be.a('function');
    });
});
