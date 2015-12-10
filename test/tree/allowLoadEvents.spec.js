'use strict';

describe('config.allowLoadEvents', function() {
    var $tree;
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Query DOM
        $tree = $('.tree');

        // Create tree
        tree = new InspireTree({
            target: $tree,
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

    after(helpers.clearDOM);
});
