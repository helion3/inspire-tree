const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNodes.prototype.clone', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'B'
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().clone).to.be.a('function');
        expect(tree.clone).to.be.a('function');
    });

    it('returns a complete clone', function() {
        const original = tree.nodes();
        const clone = original.clone();

        expect(InspireTree.isTreeNodes(clone)).to.be.true;
        expect(clone).to.have.length(1);
        expect(clone[0].children).to.have.length(1);
    });

    it('changes to clone do not impact original', function() {
        const original = tree.nodes();
        const clone = original.clone();

        clone[0].id = 'brand-new';
        expect(original[0].id).to.equal(1);
        expect(clone[0].id).to.equal('brand-new');

        original[0].children[0].text = 'New';
        expect(original[0].children[0].text).to.equal('New');
        expect(clone[0].children[0].text).to.equal('B');
    });
});
