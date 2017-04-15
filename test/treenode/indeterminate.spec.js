var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.indeterminate', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            selection: {
                mode: 'checkbox'
            },
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'B',
                    id: 2
                }, {
                    text: 'C',
                    id: 3
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).indeterminate).to.be.a('function');
    });

    it('returns true when only some children selected', function() {
        tree.node(3).select();

        expect(tree.node(1).indeterminate()).to.be.true;
    });
});
