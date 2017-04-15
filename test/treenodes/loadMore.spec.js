var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNodes.prototype.loadMore', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            deferredLoading: true,
            pagination: {
                limit: 1
            },
            data: function(node, resolve) {
                resolve([{
                    text: 'A',
                    id: 1
                }], 3);
            }
        });
    });

    it('exists', function() {
        expect(tree.nodes().loadMore).to.be.a('function');
    });

    it('has loaded initial subset correctly', function() {
        expect(tree.nodes().length).to.equal(1);
        expect(tree.nodes().pagination().limit).to.equal(1);
    });

    it('loads the next subset correctly', function(done) {
        tree.nodes().loadMore().then(function() {
            expect(tree.nodes().length).to.equal(2);
            expect(tree.nodes().pagination().limit).to.equal(2);

            done();
        }).catch(done);
    });

    it('loads the next subset correctly', function(done) {
        tree.nodes().loadMore().then(function() {
            expect(tree.nodes().length).to.equal(3);
            expect(tree.nodes().pagination().limit).to.equal(3);

            done();
        }).catch(done);
    });

    it('stops loading when total reached', function(done) {
        tree.nodes().loadMore().then(function() {
            expect(tree.nodes().length).to.equal(3);

            done();
        }).catch(done);
    });
});
