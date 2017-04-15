var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.hide', function() {
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
        expect(tree.nodes().hide).to.be.a('function');
        expect(tree.hide).to.be.a('function');
    });

    it('hides root nodes', function() {
        var node = tree.node(1);
        expect(node.hidden()).to.be.false;

        tree.hide();

        expect(node.hidden()).to.be.true;
    });
});
