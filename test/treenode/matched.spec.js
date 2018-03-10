const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.matched', function() {
    let tree;

    before(function() {
        tree = new InspireTree({
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
});
