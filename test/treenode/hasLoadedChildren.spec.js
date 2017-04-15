var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.hasLoadedChildren', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: function(node, resolve) {
                if (!node) {
                    resolve([{
                        text: 'A',
                        id: 1,
                        children: true
                    }, {
                        text: 'B',
                        id: 2,
                        children: true
                    }, {
                        text: 'C',
                        id: 3,
                        children: true
                    }]);
                }
                else if (node.id === '1') {
                    resolve([{
                        text: 'AA'
                    }]);
                }
                else if (node.id === '2') {
                    resolve([]);
                }
            }
        });
    });

    it('exists', function() {
        expect(tree.node(1).hasLoadedChildren).to.be.a('function');
    });

    it('returns false for a node which has not yet loaded', function() {
        expect(tree.node(2).hasLoadedChildren()).to.be.false;
    });

    it('returns true for a node which has loaded with an empty result', function(done) {
        tree.node(2).expand().then(function() {
            expect(tree.node(2).hasLoadedChildren()).to.be.true;
            done();
        }).catch(done);
    });

    it('returns true for a node which has loaded children', function(done) {
        tree.node(1).expand().then(function() {
            expect(tree.node(1).hasLoadedChildren()).to.be.true;
            done();
        }).catch(done);
    });
});
