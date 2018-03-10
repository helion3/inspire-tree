const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('Tree.addNodes', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: []
            }]
        });
    });

    it('exists', function() {
        expect(tree.addNodes).to.be.a('function');
    });

    it('adds new nodes', function() {
        expect(tree.nodes()).to.have.length(1);

        tree.addNodes([{
            text: 'B'
        }, {
            text: 'C'
        }]);

        expect(tree.nodes()).to.have.length(3);
    });
});
