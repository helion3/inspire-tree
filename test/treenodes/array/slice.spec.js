const expect = require('chai').expect;
const InspireTree = require('../../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNodes extends Array.prototype.slice', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A'
            }, {
                text: 'B'
            }, {
                text: 'C'
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().slice).to.be.a('function');
        expect(tree.slice).to.be.a('function');
    });

    it('slices treenodes', function() {
        const res = tree.nodes().slice(0, 1);

        expect(res).to.have.length(1);
        expect(res[0].text).to.equal('A');
    });
});
