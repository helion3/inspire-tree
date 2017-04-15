var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.pagination', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            deferredLoading: true,
            pagination: {
                limit: 1
            },
            data: function(node, resolve) {
                if (!node) {
                    resolve([{
                        text: 'A',
                        id: 1,
                        children: true
                    }]);
                }
                else {
                    resolve([{
                        text: 'C'
                    }], 3);
                }
            }
        });
    });

    it('exists', function() {
        expect(tree.node(1).pagination).to.be.a('function');
    });

    it('sets initial pagination correctly', function() {
        var node = tree.node(1);

        node.loadChildren().then(function() {
            expect(node.pagination().limit).to.equal(1);
            expect(node.pagination().total).to.equal(3);
        });
    });

    it('updates pagination on load more', function(done) {
        var node = tree.node(1);

        node.loadMore().then(function() {
            expect(node.pagination().limit).to.equal(2);
            expect(node.pagination().total).to.equal(3);

            done();
        }).catch(done);
    });
});
