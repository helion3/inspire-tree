'use strict';

describe('DOM', function() {
    before(function() {
        helpers.createTreeContainer();
    });

    var $tree;

    it('renders root nodes', function() {
        new InspireTree({
            target: '.tree',
            data: [{
                text: 'A',
                id: 1
            }, {
                text: 'B',
                id: 2,
                children: [{
                    text: 'B1'
                }]
            }]
        });

        $tree = $('.tree');

        expect($tree.find('[data-uid=1] > div .title').text()).to.equal('A');
        expect($tree.find('[data-uid=2] > div .title').text()).to.equal('B');
    });

    it('renders wholerow div', function() {
        expect($tree.find('[data-uid=1] > .wholerow')).to.have.length(1);
    });

    it('renders toggle only for nodes with children', function() {
        expect($tree.find('[data-uid=1] .toggle')).to.have.length(0);
        expect($tree.find('[data-uid=2] .toggle')).to.have.length(1);
    });

    after(helpers.clearDOM);
});
