'use strict';

describe('TreeNodes.prototype.blur', function() {
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Create tree
        tree = new InspireTree({
            target: $('.tree'),
            data: [{
                text: 'A',
                id: 1
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().blur).to.be.a('function');
        expect(tree.blur).to.be.a('function');
    });

    it('blurs root nodes', function() {
        var node = tree.node(1);
        node.focus();

        expect(node.focused()).to.be.true;

        tree.blur();
        expect(node.focused()).to.be.false;
    });

    after(helpers.clearDOM);
});
