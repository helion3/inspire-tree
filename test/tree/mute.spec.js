'use strict';

describe('Tree.mute', function() {
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Create tree
        tree = new InspireTree({
            target: $('.tree'),
            data: [{
                id: 1,
                text: 'A'
            }, {
                id: 2,
                text: 'B'
            }]
        });
    });

    it('exists', function() {
        expect(tree.mute).to.be.a('function');
    });

    it('mutes events', function() {
        // Make sure an event fires first...
        var callback = sinon.spy();
        tree.on('node.selected', callback);
        tree.node(1).select();
        callback.should.have.been.called;

        // Mute
        tree.mute();

        callback = sinon.spy();
        tree.on('node.selected', callback);
        tree.node(2).select();
        callback.should.not.have.been.called;

        tree.unmute();
    });

    after(helpers.clearDOM);
});
