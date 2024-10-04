const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.getTextualHierarchy', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'AA',
                    id: 2,
                    children: [{
                        text: 'AAA',
                        id: 3
                    }]
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).getTextualHierarchy).to.be.a('function');
    });

    it('returns only text for root node', function() {
        expect(tree.node(1).getTextualHierarchy()).to.have.length(1);
    });

    it('returns both parent texts for child node', function() {
        const parents = tree.node(3).getTextualHierarchy();

        expect(parents).to.have.length(3);
        expect(parents[0]).to.equal('A');
        expect(parents[1]).to.equal('AA');
        expect(parents[2]).to.equal('AAA');
    });

    it('returns both parent texts for child node after cloning node', function() {
        const parents = tree.node(3).clone().getTextualHierarchy();

        expect(parents).to.have.length(3);
        expect(parents[0]).to.equal('A');
        expect(parents[1]).to.equal('AA');
        expect(parents[2]).to.equal('AAA');
    });

    it('returns both parent texts for child node after cloning nodes', function() {
        const parents = tree.nodes().clone().node(3).getTextualHierarchy();

        expect(parents).to.have.length(3);
        expect(parents[0]).to.equal('A');
        expect(parents[1]).to.equal('AA');
        expect(parents[2]).to.equal('AAA');
    });
});
