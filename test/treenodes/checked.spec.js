const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNodes.prototype.checked', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            editable: true,
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'B'
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().checked).to.be.a('function');
        expect(tree.checked).to.be.a('function');
    });

    it('returns checked nodes', function() {
        expect(tree.checked()).to.have.length(0);

        tree.node(1).check();
        expect(tree.checked()).to.have.length(2);
    });
});
