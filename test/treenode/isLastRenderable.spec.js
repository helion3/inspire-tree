const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.isLastRenderable', function() {
    let tree;

    beforeEach(function() {
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
        tree.node(3).softRemove();

        expect(tree.node(2).isLastRenderable()).to.be.true;
    });

    it('returns false when node itslef is not renderable', function() {
        tree.node(3).softRemove();

        expect(tree.node(3).isLastRenderable()).to.be.false;
    });

    it('works after search', function() {
        tree.search('B');

        expect(tree.node(2).isLastRenderable()).to.be.true;
    });

    it('works after search matching children', function() {
        tree = new InspireTree({
            data: [{
                text: 'First Node',
                id: 1,
                children: [{
                    id: 11,
                    text: 'Child A1'
                }]
            }, {
                text: 'Second Node',
                id: 2,
                children: [{
                    id: 21,
                    text: 'Child B1'
                }, {
                    id: 22,
                    text: 'Child B2'
                }]
            }]
        });

        tree.search('Child B');

        expect(tree.node(1).isLastRenderable()).to.be.false;
        expect(tree.node(21).isLastRenderable()).to.be.false;

        expect(tree.node(2).isLastRenderable()).to.be.true;
        expect(tree.node(22).isLastRenderable()).to.be.true;
    });

    it('works after search matching grandchildren', function() {
        tree = new InspireTree({
            data: [{
                text: 'First Node',
                id: 1,
                children: [{
                    id: 11,
                    text: 'Child A1'
                }]
            }, {
                text: 'Second Node',
                id: 2,
                children: [{
                    id: 21,
                    text: 'Child B1',
                    children: [{
                        id: 211,
                        text: 'Grandchild B1A'
                    }, {
                        id: 212,
                        text: 'Grandchild B1B'
                    }]
                }]
            }]
        });

        tree.search('Grandchild');

        expect(tree.node(1).isLastRenderable()).to.be.false;
        expect(tree.node(211).isLastRenderable()).to.be.false;

        expect(tree.node(2).isLastRenderable()).to.be.true;
        expect(tree.node(21).isLastRenderable()).to.be.true;
        expect(tree.node(212).isLastRenderable()).to.be.true;
    });
});
