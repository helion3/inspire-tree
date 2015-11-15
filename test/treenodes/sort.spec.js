'use strict';

describe('TreeNodes.prototype.sort', function() {
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
                text: 'D',
                id: 1,
                children: [{
                    text: 'B'
                }]
            }, {
                text: 'C'
            }, {
                text: 'a'
            }]
        });
    });

    it('exists', function() {
        expect(tree.getNodes().sort).to.be.a('function');
    });

    it('sorts alphabetically', function() {
        var nodes = tree.getNodes();
        expect(nodes[0].text).to.equal('D');
        expect(nodes[1].text).to.equal('C');
        expect(nodes[2].text).to.equal('a');

        // Sort
        tree.getNodes().sort('text');

        // Check original model
        nodes = tree.getNodes();
        expect(nodes[0].text).to.equal('C');
        expect(nodes[1].text).to.equal('D');
        expect(nodes[2].text).to.equal('a');
    });

    after(helpers.clearDOM);
});
