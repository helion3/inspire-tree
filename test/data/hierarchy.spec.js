'use strict';

describe('Hierarchy', function() {
    var tree;

    before(function() {
        helpers.createTreeContainer();

        tree = new InspireTree({
            target: '.tree',
            data: [{
                title: 'A',
                id: 1,
                children: [{
                    title: 'AA',
                    id: 11,
                    children: [{
                        title: 'AAA',
                        id: 111
                    }]
                }]
            }]
        });
    });

    it('returns flat array of parents', function() {
        var node = tree.data.getNodeById(111);
        var parents = tree.data.getParents(node);

        expect(parents).to.have.length(2);
    });

    it('returns hierarchy', function() {
        var node = tree.data.getNodeById(111);
        var root = tree.data.copyHierarchy(node);

        expect(root).to.be.an('object');
        expect(root.title).to.equal('A');
        expect(root.children[0].title).to.equal('AA');
        expect(root.children[0].children[0].title).to.equal('AAA');
    });

    it('returns hierarchy excluding given node', function() {
        var node = tree.data.getNodeById(111);
        var root = tree.data.copyHierarchy(node, true);

        expect(root).to.be.an('object');
        expect(root.title).to.equal('A');
        expect(root.children[0].title).to.equal('AA');
        expect(root.children[0].children).to.be.undefned;
    });

    after(helpers.clearDOM);
});
