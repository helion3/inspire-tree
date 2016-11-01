'use strict';

describe('DOM', function() {
    before(function() {
        helpers.createTreeContainer();
    });

    var $tree;

    it('re-renders individually added, sorted nodes', function() {
        var tree = new InspireTree({
            sort: 'text',
            target: '.tree',
            data: [{
                text: 'Test'
            }]
        });

        $tree = $('.tree');

        _.each([{ text: 'B' }, { text: 'A' }], function(child) {
            tree.get(0).addChild(child);
        });

        var $parent = $tree.find('[data-uid=' + tree.get(0).id + ']');

        expect($parent.find('li:eq(0) .title').text()).to.equal('A');
        expect($parent.find('li:eq(1) .title').text()).to.equal('B');
    });

    after(helpers.clearDOM);
});
