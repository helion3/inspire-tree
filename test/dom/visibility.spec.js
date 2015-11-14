'use strict';

describe('Visibility', function() {
    var $tree;
    var tree;

    before(function() {
        helpers.createTreeContainer();

        tree = new InspireTree({
            target: '.tree',
            data: [{
                text: 'A',
                id: 1
            }, {
                text: 'B',
                children: [{
                    text: 'B1'
                }]
            }]
        });

        $tree = $('.tree');
    });

    it('hides a node via api', function() {
        tree.getNode(1).hide();
        expect($tree.find('li:eq(0)').hasClass('hidden')).to.be.true;
    });

    it('shows a node via api', function() {
        tree.getNode(1).show();
        expect($tree.find('li:eq(0)').hasClass('hidden')).to.be.false;
    });

    it('hides nodes via api', function() {
        tree.hideAll();

        expect($tree.find('li:eq(0)').hasClass('hidden')).to.be.true;
        expect($tree.find('li:eq(1)').hasClass('hidden')).to.be.true;
    });

    it('children of hidden node also marked as hidden', function() {
        tree.hideAll();

        expect($tree.find('li:eq(1) li').hasClass('hidden')).to.be.true;
    });

    after(helpers.clearDOM);
});
