'use strict';

describe('Tree.isEventMuted', function() {
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
        expect(tree.isEventMuted).to.be.a('function');
    });

    it('returns true for muted events', function() {
        tree.mute('node.rendered');
        expect(tree.isEventMuted('node.rendered')).to.be.true;
    });

    it('returns false for unmuted events', function() {
        tree.unmute('node.rendered');
        expect(tree.isEventMuted('node.rendered')).to.be.false;
    });

    it('returns false for other events', function() {
        tree.mute('node.rendered');
        expect(tree.isEventMuted('node.selected')).to.be.false;
    });

    it('returns true when all events are muted', function() {
        tree.mute();
        expect(tree.muted()).to.be.true;
        expect(tree.isEventMuted('node.selected')).to.be.true;
    });

    after(helpers.clearDOM);
});
