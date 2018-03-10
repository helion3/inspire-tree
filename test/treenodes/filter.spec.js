const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNodes.prototype.filterBy', function() {
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
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().filterBy).to.be.a('function');
        expect(tree.filterBy).to.be.a('function');
    });


    it('returns matches for custom booleans', function() {
        tree.node(2).select();

        expect(tree.filterBy('selected')).to.have.length(1);
    });
});
