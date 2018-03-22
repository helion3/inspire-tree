const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNodes.prototype.find', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A'
            }, {
                text: 'B'
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().find).to.be.a('function');
        expect(tree.find).to.be.a('function');
    });


    it('returns match', function() {
        tree.search('B');

        expect(tree.find(node => node.matched()).text).to.equal('B');
    });
});
