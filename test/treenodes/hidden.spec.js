const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNodes.prototype.hidden', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().hidden).to.be.a('function');
        expect(tree.hidden).to.be.a('function');
    });

    it('returns hidden root nodes', function() {
        expect(tree.hidden()).to.have.length(0);

        tree.node(1).hide();

        expect(tree.hidden()).to.have.length(1);
    });
});
