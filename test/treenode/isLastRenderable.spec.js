const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.isLastRenderable', function() {
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
        expect(tree.node(1).isLastRenderable).to.be.a('function');
    });

    it('returns true for the last node', function() {
        expect(tree.node(3).isLastRenderable()).to.be.true;
    });

    it('returns false when followed by renderable nodes', function() {
        expect(tree.node(1).isLastRenderable()).to.be.false;
    });

    it('returns true when followed by one hidden node', function() {
        tree.node(3).hide();

        expect(tree.node(2).isLastRenderable()).to.be.true;
    });

    it('returns false when followed by at least one renderable node', function() {
        expect(tree.node(1).isLastRenderable()).to.be.false;
    });

    it('returns true when preceeded by no renderable node', function() {
        tree.node(2).softRemove();

        expect(tree.node(1).isLastRenderable()).to.be.true;
    });

    it('returns false when node itslef is not renderable', function() {
        expect(tree.node(3).isLastRenderable()).to.be.false;
    });
});
