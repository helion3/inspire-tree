const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.renderable', function() {
    let tree;

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
        expect(tree.node(1).renderable).to.be.a('function');
    });

    it('returns true when renderable', function() {
        expect(tree.node(1).renderable()).to.be.true;
    });

    it('returns false when hidden', function() {
        const node = tree.node(1);
        node.hide();

        expect(node.renderable()).to.be.false;

        node.show();
    });

    it('returns false when soft removed', function() {
        const node = tree.node(1);
        node.softRemove();

        expect(node.renderable()).to.be.false;
    });
});
