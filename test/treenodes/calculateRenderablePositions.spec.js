const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNodes.prototype.calculateRenderablePositions', function() {
    it('calculates correct nodes on load', function() {
        const tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1
            }]
        });

        expect(tree.nodes().firstRenderableNode.id).to.equal(1);
        expect(tree.nodes().lastRenderableNode.id).to.equal(1);
    });

    it('calculates correct nodes on add', function() {
        const tree = new InspireTree({
            data: []
        });

        tree.addNode({
            text: 'A',
            id: 1
        });

        expect(tree.nodes().firstRenderableNode.id).to.equal(1);
        expect(tree.nodes().lastRenderableNode.id).to.equal(1);
    });

    it('calculates correct nodes on insert/splice', function() {
        const tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1
            }]
        });

        expect(tree.nodes().firstRenderableNode.id).to.equal(1);
        expect(tree.nodes().lastRenderableNode.id).to.equal(1);

        tree.insertAt(1, {
            text: 'B',
            id: 2
        });

        expect(tree.nodes().firstRenderableNode.id).to.equal(1);
        expect(tree.nodes().lastRenderableNode.id).to.equal(2);
    });

    it('calculates correct nodes on pop', function() {
        const tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1
            }, {
                text: 'B',
                id: 2
            }]
        });

        expect(tree.nodes().firstRenderableNode.id).to.equal(1);
        expect(tree.nodes().lastRenderableNode.id).to.equal(2);

        tree.pop();

        expect(tree.nodes().lastRenderableNode.id).to.equal(1);
    });

    it('calculates correct nodes on push', function() {
        const tree = new InspireTree({
            data: []
        });

        tree.push(tree.createNode({
            text: 'A',
            id: 1
        }));

        expect(tree.nodes().firstRenderableNode.id).to.equal(1);
        expect(tree.nodes().lastRenderableNode.id).to.equal(1);
    });

    it('calculates correct nodes on shift', function() {
        const tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1
            }, {
                text: 'B',
                id: 2
            }]
        });

        expect(tree.nodes().firstRenderableNode.id).to.equal(1);
        expect(tree.nodes().lastRenderableNode.id).to.equal(2);

        tree.shift();

        expect(tree.nodes().firstRenderableNode.id).to.equal(2);
    });

    it('calculates correct nodes on sort', function() {
        const tree = new InspireTree({
            data: [{
                text: 'B',
                id: 2
            }, {
                text: 'A',
                id: 1
            }]
        });

        expect(tree.nodes().firstRenderableNode.id).to.equal(2);
        expect(tree.nodes().lastRenderableNode.id).to.equal(1);

        tree.nodes().sortBy('text');

        expect(tree.nodes().firstRenderableNode.id).to.equal(1);
        expect(tree.nodes().lastRenderableNode.id).to.equal(2);
    });

    it('calculates correct nodes on unshift', function() {
        const tree = new InspireTree({
            data: []
        });

        tree.unshift(tree.createNode({
            text: 'A',
            id: 1
        }));

        expect(tree.nodes().firstRenderableNode.id).to.equal(1);
        expect(tree.nodes().lastRenderableNode.id).to.equal(1);
    });
});
