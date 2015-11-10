'use strict';

describe('Selection', function() {
    var $tree;
    var tree;

    before(function() {
        helpers.createTreeContainer();

        tree = new InspireTree({
            target: '.tree',
            data: [{
                title: 'A',
                id: 1,
                itree: {
                    state: {
                        selected: true
                    }
                }
            }, {
                title: 'B',
                children: [{
                    title: 'B1'
                }]
            }]
        });

        $tree = $('.tree');
    });

    it('initializes with a selected node', function() {
        expect($tree.find('li:eq(0)').hasClass('selected')).to.be.true;
    });

    it('returns array of selected nodes', function() {
        var selected = tree.data.getSelectedNodes();

        expect(selected).to.have.length(1);
        expect(selected[0].title).to.equal('A');
    });

    it('selects a node on click', function() {
        var $li = $tree.find('li:eq(1)');
        expect($li.hasClass('selected')).to.be.false;

        $li.find('> div .title').click();
        expect($li.hasClass('selected')).to.be.true;
    });

    it('deselects other nodes on node change', function() {
        expect($tree.find('li:eq(0)').hasClass('selected')).to.be.false;
    });

    it('selects node via api', function() {
        var node = tree.data.getNodeById(1);
        tree.data.selectNode(node);

        expect($tree.find('li:eq(0)').hasClass('selected')).to.be.true;
    });

    it('deselects node via api', function() {
        var node = tree.data.getNodeById(1);
        tree.data.deselectNode(node);

        expect($tree.find('li:eq(0)').hasClass('selected')).to.be.false;
    });

    after(helpers.clearDOM);
});
