'use strict';

describe('TreeNode.prototype.addChild', function() {
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
            }],
            sort: 'text'
        });
    });

    it('exists', function() {
        expect(tree.node(1).addChild).to.be.a('function');
    });

    it('adds a new child', function() {
        var node = tree.node(1);
        var $node = $('[data-uid="' + node.id + '"]');

        // Make sure nothing exists yet
        expect(node.hasChildren()).to.be.false;
        expect($node.find('li')).to.have.length(0);

        node.addChild({
            text: 'C'
        });

        expect(node.hasChildren()).to.be.true;
        expect($node.find('li')).to.have.length(1);
    });

    it('returns a TreeNode with a parent', function() {
        var node = tree.node(1);

        var child = node.addChild({
            text: 'A'
        });

        expect(child.constructor.name).to.equal('TreeNode');
        expect(child.hasParent()).to.be.true;
    });

    it('applies sort correctly to new children', function() {
        var node = tree.node(1);

        node.addChild({
            text: 'B'
        });

        expect(node.children[0].text).to.equal('A');
        expect(node.children[1].text).to.equal('B');
        expect(node.children[2].text).to.equal('C');
    });

    after(helpers.clearDOM);
});
