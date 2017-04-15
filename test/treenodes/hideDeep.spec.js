var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.hideDeep', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'B',
                    id: 2
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().hideDeep).to.be.a('function');
        expect(tree.hideDeep).to.be.a('function');
    });

    it('hides all nodes', function() {
        var node = tree.node(2);
        expect(node.hidden()).to.be.false;

        tree.hideDeep();

        expect(node.hidden()).to.be.true;
    });
});
