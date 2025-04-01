const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('Tree.search', function() {
    let tree;

    before(function() {
        tree = new InspireTree({
            data: [{
                text: 'fox',
                id: 1
            }, {
                text: 'lemur',
                id: 2,
                children: [{
                    text: 'bob',
                    id: 3
                }, {
                    text: 'sue'
                }]
            }]
        });
    });

    it('returns a promise', function() {
        expect(tree.search('fox').then).to.be.a('function');
    });

    it('returns a promise for empty search', function() {
        expect(tree.search('').then).to.be.a('function');
    });

    it('returns matches for a string query', function(done) {
        tree.search('fox').then(function(matches) {
            expect(matches).to.have.length(1);

            done();
        }).catch(done);
    });

    it('returns a match for a regex query', function(done) {
        tree.search(new RegExp('fox', 'i')).then(function(matches) {
            expect(matches).to.have.length(1);

            done();
        }).catch(done);
    });

    it('returns matches for a custom matching function', function(done) {
        const matcher = function(node) {
            return node.text.length < 4;
        };

        tree.search(matcher).then(function(matches) {
            expect(matches).to.have.length(3);

            done();
        }).catch(done);
    });

    it('hides non-matches', function() {
        tree.search('fox');

        expect(tree.node(1).hidden()).to.be.false;
        expect(tree.node(2).hidden()).to.be.true;
        expect(tree.node(3).hidden()).to.be.true;
    });

    it('clears the search', function() {
        tree.clearSearch();

        expect(tree.matched()).to.have.length(0);

        expect(tree.node(1).hidden()).to.be.false;
        expect(tree.node(2).hidden()).to.be.false;
        expect(tree.node(3).hidden()).to.be.false;
    });

    it('shows non-matching children of matched parents', function() {
        tree.search('lemur');

        expect(tree.node(1).hidden()).to.be.true;
        expect(tree.node(2).hidden()).to.be.false;
        expect(tree.node(3).hidden()).to.be.false;
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

    it('does not return removed nodes that would normally match', function(done) {
        tree.node(1).softRemove();

        tree.search('fox').then(function(matches) {
            expect(matches).to.have.length(0);

            done();
        }).catch(done);
    });

    it('uses a custom matcher', function() {
        tree = new InspireTree({
            data: [{
                text: 'fox',
                id: 1
            }, {
                text: 'cat',
                id: 1
            }, {
                text: 'dog',
                id: 1
            }, {
                text: 'lemur',
                id: 2
            }],
            search: function(query, resolve) {
                const matches = [];

                tree.nodes().each(function(node) {
                    if (node.text.length < 4) {
                        matches.push(node);
                    }
                });

                resolve(matches);
            }
        });

        expect(tree.matched()).to.have.length(0);

        // search can't be empty or it'll clear.
        // in reality, this test ignores the query entirely which is purely for testing
        tree.search('test');

        expect(tree.matched()).to.have.length(3);
    });

    it('uses a custom match processor', function() {
        tree = new InspireTree({
            data: [{
                text: 'fox',
                id: 1
            }, {
                text: 'lemur',
                id: 2
            }],
            search: {
                matchProcessor: function(matches) {
                    matches.each(function(node) {
                        node.check();
                    });
                }
            }
        });

        expect(tree.checked()).to.have.length(0);

        tree.search('fox');

        expect(tree.checked()).to.have.length(1);
        expect(tree.node(1).checked()).to.be.true;
        expect(tree.node(2).checked()).to.be.false;
    });

    it('selects the first matching node when selection required', function(done) {
        tree = new InspireTree({
            selection: {
                require: true
            },
            data: [{
                text: 'bear',
                id: 1
            }, {
                text: 'fox',
                id: 2
            }, {
                text: 'lemur',
                id: 3,
                children: [{
                    text: 'bob',
                    id: 3
                }, {
                    text: 'sue'
                }]
            }]
        });

        tree.search('fox').then(function() {
            expect(tree.node(2).selected()).to.be.true;

            done();
        }).catch(done);
    });

    it('restores original selection on search clear when selection required', function(done) {
        tree = new InspireTree({
            selection: {
                require: true
            },
            data: [{
                text: 'bear',
                id: 1
            }, {
                text: 'fox',
                id: 2
            }, {
                text: 'lemur',
                id: 3,
                children: [{
                    text: 'bob',
                    id: 3
                }, {
                    text: 'sue'
                }]
            }]
        });

        expect(tree.node(1).selected()).to.be.true;

        tree.search('fox').then(function() {
            expect(tree.node(1).selected()).to.be.false;
            expect(tree.node(2).selected()).to.be.true;

            tree.clearSearch();

            expect(tree.node(1).selected()).to.be.true;
            expect(tree.node(2).selected()).to.be.false;

            done();
        }).catch(done);
    });
});
