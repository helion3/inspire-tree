var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.show', function() {
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
        expect(tree.nodes().show).to.be.a('function');
        expect(tree.show).to.be.a('function');
    });

    it('shows root nodes', function() {
        var node = tree.node(1);

        node.hide();
        expect(node.hidden()).to.be.true;

        tree.show();
        expect(node.hidden()).to.be.false;
    });
});
