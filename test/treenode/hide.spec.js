var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.hide', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'AA'
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).hide).to.be.a('function');
    });

    it('hides node', function() {
        var node = tree.node(1);
        expect(node.hidden()).to.be.false;

        node.hide();
        expect(node.hidden()).to.be.true;
    });
});
