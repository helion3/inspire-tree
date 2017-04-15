var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.selectable', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            selection: {
                allow: function(node) {
                    if (node.id === '3') {
                        return false;
                    }
                }
            },
            data: [{
                text: 'A',
                id: 1
            }, {
                text: 'B',
                id: 2,
                itree: {
                    state: {
                        selectable: false
                    }
                }
            }, {
                text: 'C',
                id: 3
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).selectable).to.be.a('function');
    });

    it('returns true for default nodes', function() {
        expect(tree.node(1).selectable()).to.be.true;
    });

    it('returns false for unselectable node', function() {
        expect(tree.node(2).selectable()).to.be.false;
    });

    it('does not select unselectable node', function() {
        var node = tree.node(2);
        node.select();

        expect(node.selected()).to.be.false;
    });

    it('returns true for default node when using selection.allow', function() {
        expect(tree.node(1).selectable()).to.be.true;
    });

    it('returns false for unselectable node when using selection.allow', function() {
        expect(tree.node(3).selectable()).to.be.false;
    });
});
