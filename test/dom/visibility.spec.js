'use strict';

describe('Visibility', function() {
    var $tree;
    var tree;

    before(function() {
        helpers.createTreeContainer();

        tree = new InspireTree({
            target: '.tree',
            data: [{
                title: 'A',
                id: 1
            }, {
                title: 'B',
                children: [{
                    title: 'B1'
                }]
            }]
        });

        $tree = $('.tree');
    });

    it('hides a node via api', function() {
        var node = tree.data.getNodeById(1);
        tree.data.hideNode(node);

        expect($tree.find('li:eq(0)').hasClass('hidden')).to.be.true;
    });

    it('shows a node via api', function() {
        var node = tree.data.getNodeById(1);
        tree.data.showNode(node);

        expect($tree.find('li:eq(0)').hasClass('hidden')).to.be.false;
    });

    it('hides nodes via api', function() {
        tree.data.hideAll();

        expect($tree.find('li:eq(0)').hasClass('hidden')).to.be.true;
        expect($tree.find('li:eq(1)').hasClass('hidden')).to.be.true;
    });

    it('children of hidden node also marked as hidden', function() {
        tree.data.hideAll();

        expect($tree.find('li:eq(1) li').hasClass('hidden')).to.be.true;
    });

    after(helpers.clearDOM);
});
