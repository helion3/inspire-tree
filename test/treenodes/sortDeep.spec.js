const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNodes.prototype.sortDeep', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'A'
                }, {
                    text: 'B'
                }, {
                    text: 'B'
                }]
            }, {
                text: 'B'
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().sortDeep).to.be.a('function');
        expect(tree.sortDeep).to.be.a('function');
    });

    it('sorts treenodes', function() {
        const nodes = tree.nodes();

        tree.search('B');

        nodes.sortDeep((a, b) => b.matched() - a.matched());

        expect(nodes[0].text).to.equal('B');
        expect(nodes[1].text).to.equal('A');

        const node = tree.node(1);
        expect(node.children[0].text).to.equal('B');
        expect(node.children[1].text).to.equal('B');
        expect(node.children[2].text).to.equal('A');
    });
});
