'use strict';

describe('Search', function() {
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

    it('throws error for invalid search argument', function() {
        expect(tree.search).to.throw(TypeError);
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

        expect(tree.getNode(1).hidden()).to.be.false;
        expect(tree.getNode(2).hidden()).to.be.true;
    });

    it('clears the search', function() {
        tree.clearSearch();

        expect(tree.getNode(1).hidden()).to.be.false;
        expect(tree.getNode(2).hidden()).to.be.false;
    });

    it('shows hierarchy when child matches', function() {
        tree.search('bob');

        expect(tree.getNode(1).hidden()).to.be.true;
        expect(tree.getNode(2).hidden()).to.be.false;
        expect(tree.getNode(2).collapsed()).to.be.false;
        expect(tree.getNode(2).children[0].hidden()).to.be.false;
        expect(tree.getNode(2).children[1].hidden()).to.be.true;
    });

    after(helpers.clearDOM);
});
