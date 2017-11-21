var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('Tree.prototype.pagination', function() {
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
        expect(tree.pagination).to.be.a('function');
    });

    it('sets initial pagination data correctly', function() {
        var pagination = tree.pagination();

        expect(pagination).to.be.an('object');
        expect(pagination.limit).to.equal(-1);
        expect(pagination.total).to.equal(10);
    });

    it('does not clear existing data when deferred loading is used', function() {
        var tree = new InspireTree({
            deferredLoading: true,
            data: function(node, resolve) {
                resolve([{
                    text: 'Test'
                }], 2);
            }
        });

        tree.load([{
            text: 'Test2'
        }]);

        expect(tree.nodes()).to.have.length(2);
    });

    it('sets pagination totals when using array', function(done) {
        // Create tree
        tree = new InspireTree({
            pagination: {
                limit: 5
            },
            data: [{
                text: '0',
                children: [{
                    text: '0.0',
                    children: [{
                        text: '0.0.0'
                    }, {
                        text: '0.0.1'
                    }, {
                        text: '0.0.2'
                    }, {
                        text: '0.0.3'
                    }, {
                        text: '0.0.4'
                    }, {
                        text: '0.0.5'
                    }]
                }, {
                    text: '0.1'
                }, {
                    text: '0.2'
                }, {
                    text: '0.3'
                }, {
                    text: '0.4'
                }, {
                    text: '0.5'
                }]
            }, {
                text: '1'
            }, {
                text: '2'
            }, {
                text: '3'
            }, {
                text: '4'
            }, {
                text: '5'
            }]
        });

        tree.on('model.loaded', function() {
            var pagination = tree.pagination();

            expect(pagination).to.be.an('object');
            expect(pagination.limit).to.equal(5);
            expect(pagination.total).to.equal(6);

            var count = 2;
            tree.nodes().recurseDown((node) => {
                if (node.hasChildren()) {
                    expect(node.children._pagination.limit).to.equal(5);
                    expect(node.children._pagination.total).to.equal(6);

                    if (!--count) {
                        done();

                        return false;
                    }
                }
            });
        });
    });
});
