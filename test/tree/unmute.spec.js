const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');
const sinon = require('sinon');

describe('Tree.unmute', function() {
    let tree;

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
        expect(tree.unmute).to.be.a('function');
    });

    it('mutes events', function() {
        // Mute
        tree.mute();

        // Make sure events are muted...
        let callback = sinon.spy();
        tree.on('node.selected', callback);
        tree.node(1).select();
        callback.should.not.have.been.called;

        tree.unmute();

        callback = sinon.spy();
        tree.on('node.selected', callback);
        tree.node(2).select();
        callback.should.have.been.called;
    });
});
