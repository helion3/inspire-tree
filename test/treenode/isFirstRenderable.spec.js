const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.isFirstRenderable', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1
            }, {
                text: 'B',
                id: 2
            }, {
                text: 'C',
                id: 3
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).isFirstRenderable).to.be.a('function');
    });

    it('returns true for the first node', function() {
        expect(tree.node(1).isFirstRenderable()).to.be.true;
    });

    it('returns false when preceeded by renderable nodes', function() {
        expect(tree.node(3).isFirstRenderable()).to.be.false;
    });

    it('returns true when preceeded by one hidden node', function() {
        tree.node(1).hide();

        expect(tree.node(2).isFirstRenderable()).to.be.true;
    });

    it('returns false when preceeded by at least one renderable node', function() {
        expect(tree.node(3).isFirstRenderable()).to.be.false;
    });

    it('returns true when preceeded by no renderable node', function() {
        tree.node(2).softRemove();

        expect(tree.node(3).isFirstRenderable()).to.be.true;
    });

    it('returns false when node itslef is not renderable', function() {
        expect(tree.node(1).isFirstRenderable()).to.be.false;
    });
});
