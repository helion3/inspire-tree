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
                text: 'A'
            }, {
                text: 'B',
                children: [{
                    text: 'B1'
                }]
            }]
        });

        $tree = $('.tree');
        var $lis = $tree.find('li');

        expect($lis.eq(0).find('.title').text()).to.equal('A');
        expect($lis.eq(1).find('> div .title').text()).to.equal('B');
    });

    it('renders wholerow div', function() {
        expect($tree.find('li:eq(0) > .wholerow')).to.have.length(1);
    });

    it('renders toggle only for nodes with children', function() {
        expect($tree.find('li:eq(0) .toggle')).to.have.length(0);
        expect($tree.find('li:eq(1) .toggle')).to.have.length(1);
    });

    after(helpers.clearDOM);
});
