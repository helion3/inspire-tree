var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('Tree.canAutoDeselect', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            selection: {
                autoDeselect: false
            },
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
        expect(tree.canAutoDeselect).to.be.a('function');
    });

    it('returns configured value', function() {
        expect(tree.canAutoDeselect()).to.be.false;

        tree.config.selection.autoDeselect = true;
        expect(tree.canAutoDeselect()).to.be.true;
    });
});
