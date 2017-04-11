'use strict';

describe('Dynamic Loading', function() {
    var $tree;

    beforeEach(function() {
        helpers.clearDOM();
        helpers.createTreeContainer();

        $tree = $('.tree');

        new InspireTree({
            target: $tree,
            data: function(node, resolve) {
                resolve([{
                    text: 'A',
                    children: true
                }, {
                    text: 'B'
                }]);
            }
        });
    });

    it('renders toggle and folders on parent nodes', function() {
        expect($tree.find('> ol > li').eq(0).hasClass('folder')).to.be.true;
    });

    it('does not render a toggle and folders on non-parent nodes', function() {
        expect($tree.find('> ol > li').eq(1).hasClass('folder')).to.be.false;
    });

    it('renders a "Loading" list item when children are available', function() {
        expect($tree.find('> ol > li').eq(0).find('.empty')).to.have.length(1);
    });

    it('does not render nested lists when children are unavailable', function() {
        expect($tree.find('> ol > li').eq(1).find('ol')).to.have.length(0);
    });

    after(helpers.clearDOM);
});
