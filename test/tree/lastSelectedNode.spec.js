const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('Tree.lastSelectedNode', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1
            }, {
                text: 'B',
                id: 2
            }],
            selection: {
                autoDeselect: false,
                multiple: true
            }
        });
    });

    it('exists', function() {
        expect(tree.lastSelectedNode).to.be.a('function');
    });

    it('returns undefined before anything is selected', function() {
        expect(tree.lastSelectedNode()).to.be.undefined;
    });

    it('returns selected node', function() {
        tree.node(1).select();

        expect(tree.lastSelectedNode().id).to.equal(1);
    });

    it('returns last selected node', function() {
        tree.node(2).select();

        expect(tree.lastSelectedNode().id).to.equal(2);
    });

    it('returns last selected node even when another node is deselected', function() {
        tree.node(1).deselect();

        expect(tree.lastSelectedNode().id).to.equal(2);
    });

    it('returns null if last selected node is deselected', function() {
        tree.node(2).deselect();

        expect(tree.lastSelectedNode()).to.be.null;
    });
});
