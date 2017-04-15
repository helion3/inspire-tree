var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.clean', function() {
    var tree;

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
        expect(tree.node(1).clean).to.be.a('function');
    });
});
