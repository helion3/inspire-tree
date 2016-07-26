'use strict';

describe('TreeNodes.prototype.state', function() {
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Create tree
        tree = new InspireTree({
            target: $('.tree'),
            data: [{
                text: 'A',
                id: 1
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().state).to.be.a('function');
        expect(tree.state).to.be.a('function');
    });

    it('returns false when not selected', function() {
        expect(tree.node(1).state('selected')).to.be.false;
    });

    it('returns true when selected', function() {
        tree.select();
        expect(tree.node(1).state('selected')).to.be.true;
    });

    after(helpers.clearDOM);
});
