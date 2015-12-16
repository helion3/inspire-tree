'use strict';

describe('TreeNode.prototype.toObject', function() {
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Create tree
        tree = new InspireTree({
            target: '.tree',
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

    after(helpers.clearDOM);
});
