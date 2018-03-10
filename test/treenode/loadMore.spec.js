const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.loadMore', function() {
    let tree;

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
        expect(tree.node(1).loadMore).to.be.a('function');
    });

    it('has loaded initial subset correctly', function() {
        const node = tree.node(1);

        node.loadChildren().then(function() {
            expect(node.children.length).to.equal(1);
            expect(node.pagination().limit).to.equal(1);
            expect(node.pagination().total).to.equal(3);
        });
    });

    it('loads the next subset correctly', function(done) {
        const node = tree.node(1);

        node.loadMore().then(function() {
            expect(node.children.length).to.equal(2);
            expect(node.pagination().limit).to.equal(2);
            expect(node.pagination().total).to.equal(3);

            done();
        }).catch(done);
    });

    it('loads the next subset correctly', function(done) {
        const node = tree.node(1);

        node.loadMore().then(function() {
            expect(node.children.length).to.equal(3);
            expect(node.pagination().limit).to.equal(3);
            expect(node.pagination().total).to.equal(3);

            done();
        }).catch(done);
    });

    it('resolves anyway when total has been reached', function(done) {
        const node = tree.node(1);

        node.loadMore().then(function() {
            expect(node.children.length).to.equal(3);
            expect(node.pagination().limit).to.equal(3);
            expect(node.pagination().total).to.equal(3);

            done();
        }).catch(done);
    });
});
