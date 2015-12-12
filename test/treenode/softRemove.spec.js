'use strict';

describe('TreeNode.prototype.softRemove', function() {
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
                    text: 'AA'
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.getNode(1).softRemove).to.be.a('function');
    });

    it('soft removes node', function() {
        var node = tree.getNode(1);

        var $node = $('[data-uid="' + node.id + '"]');
        expect($node.hasClass('hidden')).to.be.false;
        expect(node.removed()).to.be.false;

        node.softRemove();
        expect($node.hasClass('hidden')).to.be.true;
        expect(node.removed()).to.be.true;
    });

    it('resets state on soft remove', function() {
        var node = tree.getNode(1);

        node.restore();
        node.select();

        expect(node.selected()).to.be.true;

        node.softRemove();
        expect(node.selected()).to.be.false;
    });

    after(helpers.clearDOM);
});
