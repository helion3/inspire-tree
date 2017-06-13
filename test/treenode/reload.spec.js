var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('TreeNode.prototype.reload', function() {
    var tree;

    var children = [{
        text: 'B'
    }];

    before(function() {
        // Create tree
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
                    resolve(children);
                }
            }
        });
    });

    it('exists', function() {
        expect(tree.node(1).reload).to.be.a('function');
    });

    it('reload children', function(done) {
        var node = tree.node(1);

        // Load children the first time
        node.select().expand().then(function() {
            expect(node.hasChildren()).to.be.true;
            expect(node.hasLoadedChildren()).to.be.true;
            expect(node.children).to.have.length(1);

            children.push({
                text: 'C'
            });

            // Reload children
            node.reload().then(function() {
                expect(node.children).to.have.length(2);

                done();
            }).catch(done);
        }).catch(done);
    });
});
