'use strict';

describe('Hierarchy', function() {
    var tree;

    before(function() {
        helpers.createTreeContainer();

        tree = new InspireTree({
            target: '.tree',
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'AA',
                    id: 11,
                    children: [{
                        text: 'AAA',
                        id: 111
                    }]
                }]
            }]
        });
    });

    it('returns flat array of parents', function() {
        var parents = tree.getNode(111).getParents();

        expect(parents).to.have.length(2);
    });

    it('returns hierarchy', function() {
        var root = tree.getNode(111).copyHierarchy();

        expect(root).to.be.an('object');
        expect(root.text).to.equal('A');
        expect(root.children[0].text).to.equal('AA');
        expect(root.children[0].children[0].text).to.equal('AAA');
    });

    it('returns hierarchy excluding given node', function() {
        var root = tree.getNode(111).copyHierarchy(true);

        expect(root).to.be.an('object');
        expect(root.text).to.equal('A');
        expect(root.children[0].text).to.equal('AA');
        expect(root.children[0].children).to.be.undefned;
    });

    after(helpers.clearDOM);
});
