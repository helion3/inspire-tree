const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.isOnlyRenderable', function() {
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
        expect(tree.node(1).isOnlyRenderable).to.be.a('function');
    });

    it('returns false for any node', function() {
        expect(tree.node(1).isOnlyRenderable()).to.be.false;
        expect(tree.node(2).isOnlyRenderable()).to.be.false;
        expect(tree.node(3).isOnlyRenderable()).to.be.false;
    });

    it('returns true when surrounded by hidde nodes', function() {
        tree.nodes([1, 3]).hide();

        expect(tree.node(2).isOnlyRenderable()).to.be.true;
    });

    it('works after search', function() {
        tree.search('B');

        expect(tree.node(2).isOnlyRenderable()).to.be.true;
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

        expect(tree.node(1).isOnlyRenderable()).to.be.false;
        expect(tree.node(21).isOnlyRenderable()).to.be.false;
        expect(tree.node(22).isOnlyRenderable()).to.be.false;

        expect(tree.node(2).isOnlyRenderable()).to.be.true;
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

        expect(tree.node(1).isOnlyRenderable()).to.be.false;
        expect(tree.node(211).isOnlyRenderable()).to.be.false;
        expect(tree.node(212).isOnlyRenderable()).to.be.false;

        expect(tree.node(2).isOnlyRenderable()).to.be.true;
        expect(tree.node(21).isOnlyRenderable()).to.be.true;
    });
});
