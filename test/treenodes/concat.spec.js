'use strict';

describe('TreeNodes.prototype.concat', function() {
    var $tree;
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Query DOM
        $tree = $('.tree');

        // Create tree
        tree = new InspireTree({
            target: $tree,
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
        var original = tree.nodes();
        var clone = original.clone();
        var combined = clone.concat(original);

        expect(combined.constructor.name).to.equal('TreeNodes');
        expect(original).to.have.length(1);
        expect(clone).to.have.length(1);
        expect(combined).to.have.length(2);
    });

    after(helpers.clearDOM);
});
