const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.copyHierarchy', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'B',
                    id: 2
                }, {
                    text: 'C'
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).copyHierarchy).to.be.a('function');
    });

    it('returns copy of parent with node as only child', function() {
        const hierarchy = tree.node(2).copyHierarchy();

        expect(InspireTree.isTreeNode(hierarchy)).to.be.true;
        expect(hierarchy.id).to.equal(1);
        expect(hierarchy.children).to.have.length(1);
    });

    it('returns only hierarchy with excludeNode=true', function() {
        const hierarchy = tree.node(2).copyHierarchy(true);

        expect(InspireTree.isTreeNode(hierarchy)).to.be.true;
        expect(hierarchy.id).to.equal(1);
        expect(hierarchy.children).to.be.undefined;
    });
});
