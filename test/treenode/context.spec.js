var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.context', function() {
    var tree;

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
        expect(tree.node(1).context).to.be.a('function');
    });

    it('returns the correct context', function() {
        expect(tree.node(1).context()).to.have.length(2);
        expect(tree.node(11).context()).to.have.length(1);
    });
});
