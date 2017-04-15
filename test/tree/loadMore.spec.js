var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('Tree.prototype.loadMore', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: function(node, resolve) {
                resolve([{
                    text: 'A',
                    id: 1
                }], 10);
            }
        });
    });

    it('exists', function() {
        expect(tree.loadMore).to.be.a('function');
    });

    // it('sets initial pagination data correctly', function() {
    //     var pagination = tree.pagination();
    //
    //     expect(pagination).to.be.an('object');
    //     expect(pagination.limit).to.equal(-1);
    //     expect(pagination.total).to.equal(10);
    // });

    it('sets pagination total from resolver', function() {
        tree.on('model.loaded', function() {
            var pagination = tree.pagination();

            expect(pagination).to.be.an('object');
            expect(pagination.limit).to.equal(-1);
            expect(pagination.total).to.equal(10);
        });
    });
});
