var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.blur', function() {
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
        expect(tree.nodes().blur).to.be.a('function');
        expect(tree.blur).to.be.a('function');
    });

    it('blurs root nodes', function() {
        var node = tree.node(1);
        node.focus();

        expect(node.focused()).to.be.true;

        tree.blur();
        expect(node.focused()).to.be.false;
    });
});
