const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('Tree.boundingNodes', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'A1',
                    id: 'A1'
                }, {
                    text: 'A2',
                    id: 'A2'
                }, {
                    text: 'A3',
                    id: 'A3'
                }]
            }, {
                text: 'B',
                id: 2
            }, {
                text: 'C',
                id: 3,
                children: [{
                    text: 'C1',
                    id: 'C1'
                }, {
                    text: 'C2',
                    id: 'C2'
                }, {
                    text: 'C3',
                    id: 'C3'
                }]
            }, {
                text: 'D',
                id: 4,
                children: [{
                    text: 'D1',
                    id: 'D1',
                    children: [{
                        text: 'D1A',
                        id: 'D1A'
                    }]
                }]
            }, {
                text: 'E',
                id: 5
            }, {
                text: 'F',
                id: 6
            }, {
                text: 'G',
                id: 7
            }, {
                text: 'H',
                id: 8
            }, {
                text: 'I',
                id: 9
            }, {
                text: 'J',
                id: 10
            }, {
                text: 'K',
                id: 11
            }, {
                text: 'L',
                id: 12
            }]
        });
    });

    it('exists', function() {
        expect(tree.boundingNodes).to.be.a('function');
    });

    it('returns correct min/max nodes', function() {
        let nodes = tree.boundingNodes(tree.node(3), tree.node('A1'));
        expect(nodes[0].id).to.equal('A1');
        expect(nodes[1].id).to.equal(3);

        nodes = tree.boundingNodes(tree.node('A1'), tree.node(1));
        expect(nodes[0].id).to.equal('A1');
        expect(nodes[1].id).to.equal(1);
    });

    it('returns correct min/max nodes for children with the same parent', function() {
        let nodes = tree.boundingNodes(tree.node('A1'), tree.node('A3'));
        expect(nodes[0].indexList()[0]).to.equal(0);
        expect(nodes[0].indexList()[1]).to.equal(0);
        expect(nodes[0].id).to.equal('A1');

        expect(nodes[1].indexList()[0]).to.equal(0);
        expect(nodes[1].indexList()[1]).to.equal(2);
        expect(nodes[1].id).to.equal('A3');

        nodes = tree.boundingNodes(tree.node('A3'), tree.node('A1'));
        expect(nodes[0].id).to.equal('A1');
        expect(nodes[1].id).to.equal('A3');
    });

    // Previous versions sorted by indexPath which are strings
    // This ensure the sorts of 11 come *after* 5
    it('returns correct min/max nodes for array indices 5, 11', function() {
        const nodes = tree.boundingNodes(tree.node(3), tree.node(12));
        expect(nodes[0].indexList()[0]).to.equal(2);
        expect(nodes[0].id).to.equal(3);

        expect(nodes[1].indexList()[0]).to.equal(11);
        expect(nodes[1].id).to.equal(12);
    });

    it('returns correct min/max nodes for children of varying depths', function() {
        let nodes = tree.boundingNodes(tree.node('D1A'), tree.node('A3'));
        expect(nodes[0].id).to.equal('A3');
        expect(nodes[1].id).to.equal('D1A');

        nodes = tree.boundingNodes(tree.node('A3'), tree.node('D1A'));
        expect(nodes[0].id).to.equal('A3');
        expect(nodes[1].id).to.equal('D1A');
    });
});
