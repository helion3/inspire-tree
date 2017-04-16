var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.clone', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
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
        expect(tree.nodes().clone).to.be.a('function');
        expect(tree.clone).to.be.a('function');
    });

    it('returns a complete clone', function() {
        var original = tree.nodes();
        var clone = original.clone();


        expect(tree.isTreeNodes(clone)).to.be.true;
        expect(clone).to.have.length(1);
        expect(clone[0].children).to.have.length(1);
    });

    it('changes to clone do not impact original', function() {
        var original = tree.nodes();
        var clone = original.clone();

        clone[0].id = 'brand-new';
        expect(original[0].id).to.equal('1');
        expect(clone[0].id).to.equal('brand-new');

        original[0].children[0].text = 'New';
        expect(original[0].children[0].text).to.equal('New');
        expect(clone[0].children[0].text).to.equal('B');
    });
});
