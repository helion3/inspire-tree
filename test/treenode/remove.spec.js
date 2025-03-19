const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.remove', function() {
    let tree;

    beforeEach(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).remove).to.be.a('function');
    });

    it('removes a node', function() {
        tree.node(1).remove();

        expect(tree.nodes()).to.have.length(0);
    });

    it('removes a node while retaining state', function() {
        const node = tree.node(1);
        node.select();

        expect(node.selected()).to.be.true;

        const exported = node.remove(true);

        expect(exported.itree).to.be.an('object');
        expect(exported.itree.state).to.be.an('object');
        expect(exported.itree.state.selected).to.be.true;
    });

    it('selects a new node after removing a node', function() {
        const tree1 = new InspireTree({
            selection: {
                require: true
            },
            data: [{
                text: 'A',
                id: 1
            }, {
                text: 'B',
                id: 2
            }]
        });

        expect(tree1.selected()).to.have.length(1);
        expect(tree1.selected().at(0).id).to.equal(1);

        tree1.node(1).remove();

        expect(tree1.nodes()).to.have.length(1);
        expect(tree1.selected()).to.have.length(1);
        expect(tree1.selected().at(0).id).to.equal(2);
    });
});
