'use strict';

describe('TreeNode.prototype.matched', function() {
    var tree;

    before(function() {
        helpers.createTreeContainer();

        tree = new InspireTree({
            target: '.tree',
            data: [{
                text: 'fox',
                id: 1
            }, {
                text: 'lemur',
                id: 2
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).matched).to.be.a('function');
    });

    it('returns true for matched nodes', function() {
        tree.search('fox');

        expect(tree.node(1).matched()).to.be.true;
    });

    it('returns false for non-matching nodes', function() {
        expect(tree.node(2).matched()).to.be.false;
    });

    after(helpers.clearDOM);
});
