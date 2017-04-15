var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.blur', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1
            }, {
                text: 'B',
                id: 2
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).blur).to.be.a('function');
    });

    it('blurs via api', function() {
        var node = tree.node(1);
        node.focus();
        expect(node.focused()).to.be.true;

        node.blur();
        expect(node.focused()).to.be.false;
    });
});
