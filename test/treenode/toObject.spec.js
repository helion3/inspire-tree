var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.toObject', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'B'
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).toObject).to.be.a('function');
    });

    it('returns a native object', function() {
        expect(tree.node(1).toObject().constructor.name).to.equal('Object');
    });

    it('returns children as a native array', function() {
        expect(Array.isArray(tree.node(1).toObject().children)).to.be.true;
    });
});
