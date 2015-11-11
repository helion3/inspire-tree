'use strict';

describe('Search', function() {
    var tree;

    before(function() {
        helpers.createTreeContainer();

        tree = new InspireTree({
            target: '.tree',
            data: [{
                title: 'fox',
                id: 1
            }, {
                title: 'lemur',
                id: 2,
                children: [{
                    title: 'bob'
                }, {
                    title: 'sue'
                }]
            }]
        });
    });

    it('throws error for invalid search argument', function() {
        expect(tree.data.search).to.throw(TypeError);
    });

    it('returns matches for a string query', function() {
        expect(tree.data.search('fox')).to.have.length(1);
        expect(tree.data.search('o')).to.have.length(2);
    });

    it('returns matches for a regex query', function() {
        expect(tree.data.search(new RegExp('fox', 'i'))).to.have.length(1);
        expect(tree.data.search(new RegExp('Fox'))).to.have.length(0);
    });

    it('returns matches for a custom matching function', function() {
        var matcher = function(node) {
            return node.title.length < 4;
        };

        expect(tree.data.search(matcher)).to.have.length(3);
    });

    it('hides non-matches', function() {
        tree.data.search('fox');

        expect(tree.data.getNode(1).itree.state.hidden).to.be.false;
        expect(tree.data.getNode(2).itree.state.hidden).to.be.true;
    });

    it('clears the search', function() {
        tree.data.clearSearch();

        expect(tree.data.getNode(1).itree.state.hidden).to.be.false;
        expect(tree.data.getNode(2).itree.state.hidden).to.be.false;
    });

    it('shows hierarchy when child matches', function() {
        tree.data.search('bob');

        expect(tree.data.getNode(1).itree.state.hidden).to.be.true;
        expect(tree.data.getNode(2).itree.state.hidden).to.be.false;
        expect(tree.data.getNode(2).children[0].itree.state.hidden).to.be.false;
        expect(tree.data.getNode(2).children[1].itree.state.hidden).to.be.true;
    });

    after(helpers.clearDOM);
});
