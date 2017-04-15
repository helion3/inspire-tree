var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.check', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'AA',
                    id: 11,
                    children: [{
                        text: 'AAA',
                        id: 111
                    }]
                }, {
                    text: 'AB',
                    id: 12
                }]
            }, {
                text: 'B',
                id: 2
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).check).to.be.a('function');
    });

    it('checks the node', function() {
        var node = tree.node(2);
        expect(node.checked()).to.be.false;

        node.check();
        expect(node.checked()).to.be.true;
    });

    it('checks child nodes', function() {
        var node = tree.node(1);
        node.children.each((child) => {
            expect(child.checked()).to.be.false;
        });

        node.check();
        node.children.each((child) => {
            expect(child.checked()).to.be.true;
        });
    });

    it('checks node and children when node was previously indeterminate', function() {
        // Reset
        tree.recurseDown((node) => {
            node.uncheck();
        });

        // Check the child
        tree.node(111).check();

        // Verify root node is indeterminate
        var node = tree.node(1);
        expect(node.indeterminate()).to.be.true;
        expect(node.checked()).to.be.false;

        // Check node and verify all children checked
        node.check();
        expect(node.indeterminate()).to.be.false;
        node.recurseDown((child) => {
            expect(child.checked()).to.be.true;
        });
    });
});
