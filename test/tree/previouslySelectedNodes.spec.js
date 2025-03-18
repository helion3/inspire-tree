const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('Tree.previouslySelectedNodes', function() {
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
            }, {
                text: 'C',
                id: 3
            }]
        });
    });

    it('exists', function() {
        expect(tree.previouslySelectedNodes).to.be.a('function');
    });

    it('returns previously selected nodes', function() {
        tree.node(1).select();
        expect(tree.selected()).to.have.length(1);

        tree.node(2).select();

        expect(tree.previouslySelectedNodes()).to.have.length(1);
        expect(tree.previouslySelectedNodes().at(0).id).to.equal(1);

        tree.node(3).select();
        expect(tree.selected()).to.have.length(1);

        expect(tree.previouslySelectedNodes()).to.have.length(1);
        expect(tree.previouslySelectedNodes().at(0).id).to.equal(2);
    });
});
