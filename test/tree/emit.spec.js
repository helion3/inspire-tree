const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('Tree.emit', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: []
        });
    });

    it('exists', function() {
        expect(tree.emit).to.be.a('function');
    });

    // Note: logic isn't covered since it's an external library
});
