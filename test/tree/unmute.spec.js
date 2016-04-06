'use strict';

describe('Tree.unmute', function() {
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
        expect(tree.unmute).to.be.a('function');
    });

    it('mutes events', function() {
        // Mute
        tree.mute();

        // Make sure events are muted...
        var callback = sinon.spy();
        tree.on('node.selected', callback);
        tree.node(1).select();
        callback.should.not.have.been.called;

        tree.unmute();

        callback = sinon.spy();
        tree.on('node.selected', callback);
        tree.node(2).select();
        callback.should.have.been.called;
    });

    after(helpers.clearDOM);
});
