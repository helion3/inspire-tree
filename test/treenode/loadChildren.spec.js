var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.loadChildren', function() {
    var tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            selection: {
                mode: 'checkbox'
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
                        text: 'B',
                        id: 2
                    }]);
                }
            }
        });
    });

    it('exists', function() {
        expect(tree.node(1).loadChildren).to.be.a('function');
    });

    it('loads children', function(done) {
        var node = tree.node(1);

        expect(node.hasChildren()).to.be.false;
        expect(node.hasLoadedChildren()).to.be.false;
        expect(node.selected()).to.be.false;

        node.select().expand().then(function() {
            expect(node.hasChildren()).to.be.true;
            expect(node.hasLoadedChildren()).to.be.true;
            expect(node.selected()).to.be.true;
            done();
        }).catch(done);
    });

    it('shares checked states', function() {
        expect(tree.node(2).selected()).to.be.true;
    });
});
