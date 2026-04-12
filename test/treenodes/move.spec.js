const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNodes.prototype.move', function() {
    let tree;

    before(function() {
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: []
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
        expect(tree.nodes().move).to.be.a('function');
        expect(tree.move).to.be.a('function');
    });

    it('moves a node to a specific index', function() {
        expect(tree.nodes()[0].id).to.equal(1);
        expect(tree.nodes()[1].id).to.equal(2);
        expect(tree.nodes()[2].id).to.equal(3);

        tree.nodes().move(1, 0);

        expect(tree.nodes()[0].id).to.equal(2);
        expect(tree.nodes()[1].id).to.equal(1);
        expect(tree.nodes()[2].id).to.equal(3);
    });

    it('moves a node to a specific index', function() {
        tree.nodes().move(0, 2);

        expect(tree.nodes()[0].id).to.equal(1);
        expect(tree.nodes()[1].id).to.equal(3);
        expect(tree.nodes()[2].id).to.equal(2);
    });

    it('moves a node to another collection', function() {
        const node = tree.node(1);

        expect(tree.nodes()).to.have.length(3);
        expect(node.children).to.have.length(0);

        tree.nodes().move(2, 0, node.children);

        expect(tree.nodes()).to.have.length(2);
        expect(node.children).to.have.length(1);
        expect(node.children[0].id).to.equal(2);
    });

    it('clears itree.parent when inserting a node at the root level', function() {
        // Node 2 is currently a child of node 1 (from previous test)
        const node2 = tree.node(2);
        expect(node2.hasParent()).to.be.true;

        // Insert node 2 at root level via insertAt
        tree.nodes().insertAt(tree.nodes().length, node2);

        expect(node2.hasParent()).to.be.false;
    });

    it('recalculates renderable positions when insertAt moves a node to a new context', function() {
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'A1',
                    id: 11
                }, {
                    text: 'A2',
                    id: 12
                }]
            }, {
                text: 'B',
                id: 2
            }, {
                text: 'C',
                id: 3
            }]
        });

        const nodeA1 = tree.node(11);

        // Verify initial state: A1 is first renderable in A's children
        expect(nodeA1.isFirstRenderable()).to.be.true;
        expect(tree.node(12).isLastRenderable()).to.be.true;

        // insertAt on root with A1's id — A1 is found as a descendant (merge path).
        // This should physically move A1 from A's children to root and recalculate positions.
        tree.nodes().insertAt(tree.nodes().length, nodeA1);

        // A1 should now be in root, not in A's children
        expect(nodeA1.hasParent()).to.be.false;
        expect(nodeA1.context()).to.equal(tree.nodes());

        // A's children should have only A2 now
        expect(tree.node(1).children).to.have.length(1);
        expect(tree.node(12).isOnlyRenderable()).to.be.true;

        // Root should include A1 as the last renderable
        expect(nodeA1.isLastRenderable()).to.be.true;
    });
});
