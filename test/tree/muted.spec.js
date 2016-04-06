'use strict';

describe('Tree.muted', function() {
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Create tree
        tree = new InspireTree({
            target: $('.tree'),
            data: []
        });
    });

    it('exists', function() {
        expect(tree.muted).to.be.a('function');
    });

    it('returns correct mute settings for arrays', function() {
        tree.mute(['node.selected', 'node.clicked', 'model.loaded']);
        expect(tree.muted()).to.have.length(3);

        tree.unmute(['node.clicked']);
        expect(tree.muted()).to.have.length(2);
        expect(_.includes(tree.muted(), 'node.clicked')).to.be.false;
    });

    it('returns correct mute settings for mixed array values', function() {
        tree.mute();
        expect(tree.muted()).to.be.true;

        tree.unmute(['node.clicked']);
        expect(tree.muted()).to.be.false;
    });

    it('returns correct mute settings for mixed string values', function() {
        tree.mute('node.clicked');
        expect(tree.muted()).to.have.length(1);

        tree.unmute('node.clicked');
        expect(tree.muted()).to.be.false;
    });

    after(helpers.clearDOM);
});
