const expect = require('chai').expect;
const InspireTree = require('../../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNodes extends Array.prototype.reduce', function() {
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
        expect(tree.nodes().reduce).to.be.a('function');
        expect(tree.reduce).to.be.a('function');
    });

    it('reduces nodes to an array of text', function() {
        const res = tree.nodes().reduce(function(a, b) {
            a.push(b.text);

            return a;
        }, []);

        expect(res).to.have.length(3);
        expect(res[0]).to.equal('A');
        expect(res[1]).to.equal('B');
        expect(res[2]).to.equal('C');
    });
});
