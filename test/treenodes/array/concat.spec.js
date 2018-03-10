const expect = require('chai').expect;
const InspireTree = require('../../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNodes extends Array.prototype.concat', function() {
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
        expect(tree.nodes().concat).to.be.a('function');
        expect(tree.concat).to.be.a('function');
    });

    it('combines two tree nodes arrays into one', function() {
        const original = tree.nodes();
        const clone = original.clone();
        const combined = clone.concat(original);

        expect(InspireTree.isTreeNodes(combined)).to.be.true;
        expect(original).to.have.length(1);
        expect(clone).to.have.length(1);
        expect(combined).to.have.length(2);
    });
});
