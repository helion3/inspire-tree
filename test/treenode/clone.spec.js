'use strict';

describe('TreeNode.prototype.clone', function() {
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
                children: [{
                    text: 'B'
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).clone).to.be.a('function');
    });

    it('returns a complete clone', function() {
        var original = tree.node(1);
        var clone = original.clone();

        expect(clone.constructor.name).to.equal('TreeNode');
        expect(clone.id).to.equal(original.id);
        expect(clone.hasChildren()).to.be.true;
    });

    it('changes to clone do not impact original', function() {
        var original = tree.node(1);
        var clone = original.clone();

        clone.id = 'brand-new';
        expect(original.id).to.equal('1');
        expect(clone.id).to.equal('brand-new');

        original.children[0].text = 'New';
        expect(original.children[0].text).to.equal('New');
        expect(clone.children[0].text).to.equal('B');
    });

    after(helpers.clearDOM);
});
