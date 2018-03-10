const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.toggleCollapse', function() {
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

    let node;

    it('exists', function() {
        node = tree.node(1);
        expect(node.toggleCollapse).to.be.a('function');
    });

    it('expands node', function() {
        node.toggleCollapse();

        expect(node.collapsed()).to.be.false;
    });

    it('collapses node', function() {
        node.toggleCollapse();

        expect(node.collapsed()).to.be.true;
    });
});
