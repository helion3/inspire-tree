const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.clone', function() {
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
        expect(tree.node(1).clone).to.be.a('function');
    });

    it('returns a clone', function() {
        const original = tree.node(1);
        const clone = original.clone();

        expect(InspireTree.isTreeNode(clone)).to.be.true;
        expect(clone.id).to.equal(original.id);
        expect(clone.hasChildren()).to.be.true;
        expect(clone.itree.parent).to.eql(original.itree.parent);
    });

    it('changes to clone do not impact original', function() {
        const original = tree.node(1);
        const clone = original.clone();

        clone.id = 'brand-new';
        expect(original.id).to.equal(1);
        expect(clone.id).to.equal('brand-new');

        original.children[0].text = 'New';
        expect(original.children[0].text).to.equal('New');
        expect(clone.children[0].text).to.equal('B');
    });
});
