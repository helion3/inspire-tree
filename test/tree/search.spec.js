'use strict';

describe('Tree.search', function() {
    var tree;

    before(function() {
        helpers.createTreeContainer();

        tree = new InspireTree({
            target: '.tree',
            data: [{
                text: 'fox',
                id: 1
            }, {
                text: 'lemur',
                id: 2,
                children: [{
                    text: 'bob'
                }, {
                    text: 'sue'
                }]
            }]
        });
    });

    it('returns matches for a string query', function() {
        expect(tree.search('fox')).to.have.length(1);
        expect(tree.search('o')).to.have.length(2);
    });

    it('returns matches for a regex query', function() {
        expect(tree.search(new RegExp('fox', 'i'))).to.have.length(1);
        expect(tree.search(new RegExp('Fox'))).to.have.length(0);
    });

    it('returns matches for a custom matching function', function() {
        var matcher = function(node) {
            return node.text.length < 4;
        };

        expect(tree.search(matcher)).to.have.length(3);
    });

    it('hides non-matches', function() {
        tree.search('fox');

        expect(tree.node(1).hidden()).to.be.false;
        expect(tree.node(2).hidden()).to.be.true;
    });

    it('clears the search', function() {
        tree.clearSearch();

        expect(tree.node(1).hidden()).to.be.false;
        expect(tree.node(2).hidden()).to.be.false;
    });

    it('clears the search when given an invalid query argument', function() {
        tree.search('fox');
        expect(tree.node(2).hidden()).to.be.true;

        tree.search();
        expect(tree.node(2).hidden()).to.be.false;
    });

    it('shows hierarchy when child matches', function() {
        tree.search('bob');

        expect(tree.node(1).hidden()).to.be.true;
        expect(tree.node(2).hidden()).to.be.false;
        expect(tree.node(2).collapsed()).to.be.false;
        expect(tree.node(2).children[0].hidden()).to.be.false;
        expect(tree.node(2).children[1].hidden()).to.be.true;
    });

    it('does not return removed nodes', function() {
        tree.node(1).softRemove();

        expect(tree.search('fox')).to.have.length(0);
    });

    after(helpers.clearDOM);
});
