const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.removed', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'AA'
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).removed).to.be.a('function');
    });

    it('soft removes node', function() {
        const node = tree.node(1);
        node.softRemove();

        expect(node.removed()).to.be.true;
    });
});
