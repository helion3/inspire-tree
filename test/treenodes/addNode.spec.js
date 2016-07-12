'use strict';

describe('TreeNodes.prototype.addNode', function() {
    var $tree;
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Query DOM
        $tree = $('.tree');

        // Create tree
        tree = new InspireTree({
            target: $tree,
            sort: 'text',
            data: [{
                text: 'B',
                id: 1,
                children: []
            }]
        });
    });

    it('exists', function() {
        expect(tree.addNode).to.be.a('function');
    });

    it('adds a new node', function() {
        expect(tree.nodes()).to.have.length(1);
        expect($tree.find('li')).to.have.length(1);

        tree.addNode({ text: 'C' });

        expect(tree.nodes()).to.have.length(2);
        expect($tree.find('li')).to.have.length(2);
    });

    it('sorts new nodes', function() {
        tree.addNode({ text: 'A' });

        expect(tree.get(0).text).to.equal('A');
        expect(tree.get(2).text).to.equal('C');
    });

    after(helpers.clearDOM);
});
