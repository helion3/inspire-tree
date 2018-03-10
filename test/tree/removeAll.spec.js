const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('Tree.removeAll', function() {
    it('removes all nodes', function() {
        const tree = new InspireTree({
            data: [{
                text: 'A'
            }]
        });

        expect(tree.nodes()).to.have.length(1);

        tree.removeAll();

        expect(tree.nodes()).to.have.length(0);
    });
});
