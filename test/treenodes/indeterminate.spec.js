var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.indeterminate', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            selection: {
                mode: 'checkbox'
            },
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'B',
                    id: 2
                }, {
                    text: 'C',
                    id: 3
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().indeterminate).to.be.a('function');
        expect(tree.indeterminate).to.be.a('function');
    });

    it('returns indeterminate nodes', function() {
        tree.node(3).select();

        expect(tree.indeterminate()).to.have.length(1);
    });
});
