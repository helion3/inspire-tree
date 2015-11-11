'use strict';

describe('Expand & Collapse', function() {
    var $tree;
    var tree;

    before(function() {
        helpers.createTreeContainer();

        tree = new InspireTree({
            target: '.tree',
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'A1',
                    id: 10
                }]
            }]
        });

        $tree = $('.tree');
    });

    it('expands children via click', function() {
        var $li = $tree.find('li:eq(0)');
        expect($li.hasClass('collapsed')).to.be.true;

        $li.find('> div .toggle').click();
        expect($li.hasClass('collapsed')).to.be.false;
    });

    it('collapses children via click', function() {
        var $li = $tree.find('li:eq(0)');
        expect($li.hasClass('collapsed')).to.be.false;

        $li.find('> div .toggle').click();
        expect($li.hasClass('collapsed')).to.be.true;
    });

    it('expands children via api', function() {
        var $li = $tree.find('li:eq(0)');
        expect($li.hasClass('collapsed')).to.be.true;

        var node = tree.data.getNodeById(1);
        tree.dom.expandNode(node);

        expect($li.hasClass('collapsed')).to.be.false;
    });

    it('collapses children via api', function() {
        var $li = $tree.find('li:eq(0)');
        expect($li.hasClass('collapsed')).to.be.false;

        var node = tree.data.getNodeById(1);
        tree.dom.collapseNode(node);

        expect($li.hasClass('collapsed')).to.be.true;
    });

    after(helpers.clearDOM);
});
