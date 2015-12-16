'use strict';

describe('Tree.addNodes', function() {
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
                id: 1,
                children: []
            }]
        });
    });

    it('exists', function() {
        expect(tree.addNodes).to.be.a('function');
    });

    it('adds new nodes', function() {
        expect(tree.nodes()).to.have.length(1);
        expect($tree.find('li')).to.have.length(1);

        tree.addNodes([{
            text: 'B'
        }, {
            text: 'C'
        }]);

        expect(tree.nodes()).to.have.length(3);
        expect($tree.find('li')).to.have.length(3);
    });

    after(helpers.clearDOM);
});
