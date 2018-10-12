const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.loadChildren', function() {
    let tree;

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
        const node = tree.node(1);

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

    it('doesn\'t error with an invalid nodes array', function(done) {
        tree = new InspireTree({
            data: function(node, resolve) {
                if (!node) {
                    resolve([{
                        text: 'A',
                        id: 1,
                        children: true
                    }]);
                }
                else {
                    resolve();
                }
            }
        });

        tree.node(1).loadChildren().catch(function(err) {
            expect(err instanceof TypeError).to.be.true;

            done();
        });
    });
});
