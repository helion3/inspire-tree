var InspireTree = require('../../build/inspire-tree');
var sinon = require('sinon');

describe('config.allowLoadEvents', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            allowLoadEvents: ['selected'],
            data: []
        });
    });

    it('node.selected event fires for pre-selected node', function() {
        var callback = sinon.spy();

        tree.on('node.selected', callback);

        tree.load([{
            text: 'A',
            id: 1,
            itree: {
                state: {
                    selected: true
                }
            }
        }]);

        callback.should.have.been.called;
    });
});
