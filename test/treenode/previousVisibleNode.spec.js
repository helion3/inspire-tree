const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.previousVisibleNode', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'AA',
                    id: 2
                }, {
                    text: 'AA2',
                    id: 3
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).previousVisibleNode).to.be.a('function');
    });

    it('finds previous sibling node', function() {
        tree.node(1).expand();

        expect(tree.node(3).previousVisibleNode().id).to.equal(2);
    });

    it('finds parent when sibling hidden', function() {
        tree.node(2).hide();

        expect(tree.node(3).previousVisibleNode().id).to.equal(1);
    });
});
