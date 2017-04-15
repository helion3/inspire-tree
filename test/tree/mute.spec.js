var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');
var sinon = require('sinon');

describe('Tree.mute', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
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
});
