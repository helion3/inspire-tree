'use strict';

describe('inline editing', function() {
    var $tree;
    var tree;

    before(function() {
        helpers.createTreeContainer();

        $tree = $('.tree');

        tree = new InspireTree({
            target: $tree,
            editable: true,
            data: [{
                text: 'A',
                id: 1
            }]
        });
    });

    it('puts node into edit mode', function() {
        var node = tree.node(1);
        var $node = $(node.itree.ref.node);

        node.toggleEditing();

        expect(node.editing()).to.be.true;
        expect($node.find('form')).to.have.length(1);
        expect($node.find('button')).to.have.length(2);
    });

    it('saves changes', function() {
        var node = tree.node(1);
        var $node = $(node.itree.ref.node);

        $node.find('input')[0].value = 'Changed Node';
        $node.find('button').eq(0).click();

        expect(node.text).to.equal('Changed Node');
    });

    it('disables edit mode', function() {
        expect(tree.node(1).editing()).to.be.false;
    });

    after(helpers.clearDOM);
});
