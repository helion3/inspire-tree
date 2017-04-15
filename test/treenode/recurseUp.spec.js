var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.recurseUp', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'AA',
                    id: 2,
                    children: [{
                        text: 'AAA',
                        id: 3
                    }]
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).recurseUp).to.be.a('function');
    });

    it('recurse up self and all parents', function() {
        var count = 0;

        tree.node(3).recurseUp(function() {
            count++;
        });

        expect(count).to.equal(3);
    });

    it('stops recursion when returning false', function() {
        var count = 0;

        tree.node(3).recurseUp(function() {
            count++;

            return !(count === 1);
        });

        expect(count).to.equal(1);
    });
});
