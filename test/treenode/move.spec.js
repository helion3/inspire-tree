const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.move', function() {
    it('exists', function() {
        const tree = new InspireTree({
            data: [{ text: 'A', id: 1 }]
        });

        expect(tree.node(1).move).to.be.a('function');
    });

    it('initializes children on a leaf target whose children is undefined', function() {
        const tree = new InspireTree({
            data: [
                { text: 'A', id: 1 },
                { text: 'B', id: 2 }
            ]
        });

        const target = tree.node(1);
        const source = tree.node(2);

        expect(target.hasLoadedChildren()).to.be.false;

        target.move(source);

        expect(target.hasLoadedChildren()).to.be.true;
        expect(InspireTree.isTreeNodes(target.children)).to.be.true;
        expect(target.children).to.have.length(1);
        expect(target.children[0].id).to.equal(2);
    });

    it('initializes children on a dynamic target whose children is true', function() {
        const tree = new InspireTree({
            data: function(node, resolve) {
                if (!node) {
                    resolve([
                        { text: 'A', id: 1, children: true },
                        { text: 'B', id: 2 }
                    ]);
                }
            }
        });

        const target = tree.node(1);
        const source = tree.node(2);

        expect(target.children).to.equal(true);

        target.move(source);

        expect(InspireTree.isTreeNodes(target.children)).to.be.true;
        expect(target.children).to.have.length(1);
        expect(target.children[0].id).to.equal(2);
    });

    it('appends by default', function() {
        const tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [
                    { text: 'A1', id: 11 },
                    { text: 'A2', id: 12 }
                ]
            }, {
                text: 'B',
                id: 2
            }]
        });

        tree.node(1).move(tree.node(2));

        expect(tree.node(1).children).to.have.length(3);
        expect(tree.node(1).children[2].id).to.equal(2);
    });

    it('inserts at a specific index', function() {
        const tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [
                    { text: 'A1', id: 11 },
                    { text: 'A2', id: 12 }
                ]
            }, {
                text: 'B',
                id: 2
            }]
        });

        tree.node(1).move(tree.node(2), 0);

        expect(tree.node(1).children).to.have.length(3);
        expect(tree.node(1).children[0].id).to.equal(2);
        expect(tree.node(1).children[1].id).to.equal(11);
        expect(tree.node(1).children[2].id).to.equal(12);
    });

    it('inserts at a mid-array index', function() {
        const tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [
                    { text: 'A1', id: 11 },
                    { text: 'A2', id: 12 }
                ]
            }, {
                text: 'B',
                id: 2
            }]
        });

        tree.node(1).move(tree.node(2), 1);

        expect(tree.node(1).children[0].id).to.equal(11);
        expect(tree.node(1).children[1].id).to.equal(2);
        expect(tree.node(1).children[2].id).to.equal(12);
    });

    it('clamps out-of-range indices to the end', function() {
        const tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [
                    { text: 'A1', id: 11 },
                    { text: 'A2', id: 12 }
                ]
            }, {
                text: 'B',
                id: 2
            }]
        });

        tree.node(1).move(tree.node(2), 99);

        expect(tree.node(1).children[2].id).to.equal(2);
    });

    it('clamps negative indices to the start', function() {
        const tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [
                    { text: 'A1', id: 11 },
                    { text: 'A2', id: 12 }
                ]
            }, {
                text: 'B',
                id: 2
            }]
        });

        tree.node(1).move(tree.node(2), -5);

        expect(tree.node(1).children[0].id).to.equal(2);
    });

    it('preserves itree.state on the moved node', function() {
        const tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: []
            }, {
                text: 'B',
                id: 2,
                children: [{ text: 'B1', id: 21 }]
            }]
        });

        const source = tree.node(2);
        source.select();
        source.expand();

        expect(source.selected()).to.be.true;
        expect(source.expanded()).to.be.true;

        tree.node(1).move(source);

        const moved = tree.node(2);
        expect(moved.selected()).to.be.true;
        expect(moved.expanded()).to.be.true;
    });

    it('removes the node from its old parent on a cross-parent move', function() {
        const tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{ text: 'X', id: 99 }]
            }, {
                text: 'B',
                id: 2,
                children: []
            }]
        });

        const oldParent = tree.node(1);
        const target = tree.node(2);
        const node = tree.node(99);

        target.move(node);

        expect(oldParent.children.indexOf(tree.node(99))).to.equal(-1);

        let count = 0;
        target.children.each(n => {
            if (n.id === 99) {
                count++;
            }
        });
        expect(count).to.equal(1);
    });

    it('drains the source folder when moving its only child', function() {
        const tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{ text: 'X', id: 99 }]
            }, {
                text: 'B',
                id: 2,
                children: []
            }]
        });

        tree.node(2).move(tree.node(99));

        expect(tree.node(1).children).to.have.length(0);
    });

    it('emits node.moved once with the moved node and target context', function() {
        const tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: []
            }, {
                text: 'B',
                id: 2
            }]
        });

        const target = tree.node(1);
        const node = tree.node(2);
        const calls = [];

        tree.on('node.moved', function(movedNode, source, oldIndex, targetCtx, newIndex) {
            calls.push({ movedNode: movedNode, source: source, targetCtx: targetCtx, newIndex: newIndex });
        });

        target.move(node);

        expect(calls).to.have.length(1);
        expect(calls[0].movedNode.id).to.equal(2);
        expect(calls[0].targetCtx).to.equal(target.children);
    });

    it('returns the moved TreeNode now attached under the target', function() {
        const tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: []
            }, {
                text: 'B',
                id: 2
            }]
        });

        const result = tree.node(1).move(tree.node(2));

        expect(InspireTree.isTreeNode(result)).to.be.true;
        expect(result.id).to.equal(2);
        expect(result.getParent().id).to.equal(1);
        expect(tree.node(1).children.indexOf(result)).to.not.equal(-1);
    });

    it('makes the moved node the only renderable on a freshly initialized target', function() {
        const tree = new InspireTree({
            data: [
                { text: 'A', id: 1 },
                { text: 'B', id: 2 }
            ]
        });

        const target = tree.node(1);
        const node = tree.node(2);

        target.move(node);

        const moved = tree.node(2);
        expect(moved.isFirstRenderable()).to.be.true;
        expect(moved.isLastRenderable()).to.be.true;
        expect(moved.isOnlyRenderable()).to.be.true;
    });

    it('makes the moved node the last renderable when appended', function() {
        const tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [
                    { text: 'A1', id: 11 },
                    { text: 'A2', id: 12 }
                ]
            }, {
                text: 'B',
                id: 2
            }]
        });

        // A1 starts as the first renderable child of A
        expect(tree.node(11).isFirstRenderable()).to.be.true;
        expect(tree.node(12).isLastRenderable()).to.be.true;

        tree.node(1).move(tree.node(2));

        const moved = tree.node(2);
        expect(tree.node(11).isFirstRenderable()).to.be.true;
        expect(tree.node(11).isLastRenderable()).to.be.false;
        expect(tree.node(12).isLastRenderable()).to.be.false;
        expect(moved.isLastRenderable()).to.be.true;
        expect(moved.isFirstRenderable()).to.be.false;
    });

    it('makes the moved node the first renderable when prepended', function() {
        const tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [
                    { text: 'A1', id: 11 },
                    { text: 'A2', id: 12 }
                ]
            }, {
                text: 'B',
                id: 2
            }]
        });

        tree.node(1).move(tree.node(2), 0);

        const moved = tree.node(2);
        expect(moved.isFirstRenderable()).to.be.true;
        expect(moved.isLastRenderable()).to.be.false;
        expect(tree.node(11).isFirstRenderable()).to.be.false;
        expect(tree.node(12).isLastRenderable()).to.be.true;
    });

    it('does not make the moved node first or last when inserted mid-array', function() {
        const tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [
                    { text: 'A1', id: 11 },
                    { text: 'A2', id: 12 }
                ]
            }, {
                text: 'B',
                id: 2
            }]
        });

        tree.node(1).move(tree.node(2), 1);

        const moved = tree.node(2);
        expect(moved.isFirstRenderable()).to.be.false;
        expect(moved.isLastRenderable()).to.be.false;
        expect(tree.node(11).isFirstRenderable()).to.be.true;
        expect(tree.node(12).isLastRenderable()).to.be.true;
    });

    it('recalculates the source context when its first renderable is moved out', function() {
        const tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [
                    { text: 'A1', id: 11 },
                    { text: 'A2', id: 12 }
                ]
            }, {
                text: 'B',
                id: 2,
                children: []
            }]
        });

        // A1 is first renderable in A's children
        expect(tree.node(11).isFirstRenderable()).to.be.true;

        tree.node(2).move(tree.node(11));

        // A's children now has only A2; A2 should be the sole renderable
        expect(tree.node(12).isFirstRenderable()).to.be.true;
        expect(tree.node(12).isLastRenderable()).to.be.true;
        expect(tree.node(12).isOnlyRenderable()).to.be.true;
    });

    it('recalculates the source context when its last renderable is moved out', function() {
        const tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [
                    { text: 'A1', id: 11 },
                    { text: 'A2', id: 12 }
                ]
            }, {
                text: 'B',
                id: 2,
                children: []
            }]
        });

        expect(tree.node(12).isLastRenderable()).to.be.true;

        tree.node(2).move(tree.node(12));

        expect(tree.node(11).isFirstRenderable()).to.be.true;
        expect(tree.node(11).isLastRenderable()).to.be.true;
        expect(tree.node(11).isOnlyRenderable()).to.be.true;
    });

    it('recalculates root context renderables when a root node is moved into a child collection', function() {
        const tree = new InspireTree({
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

        // A is first, C is last at root
        expect(tree.node(1).isFirstRenderable()).to.be.true;
        expect(tree.node(3).isLastRenderable()).to.be.true;

        // Move C into A.children
        tree.node(1).move(tree.node(3));

        // Root now has [A, B] — A first, B last
        expect(tree.node(1).isFirstRenderable()).to.be.true;
        expect(tree.node(2).isLastRenderable()).to.be.true;

        // C is the only renderable child of A
        expect(tree.node(3).isOnlyRenderable()).to.be.true;
    });

    it('throws when moving a node into itself', function() {
        const tree = new InspireTree({
            data: [{ text: 'A', id: 1 }]
        });

        const node = tree.node(1);

        expect(function() {
            node.move(node);
        }).to.throw(/itself/);
    });
});
