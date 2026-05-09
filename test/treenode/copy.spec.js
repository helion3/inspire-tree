const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.copy', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                data: 'A',
                id: 1
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).copy).to.be.a('function');
    });

    describe('with dynamic children placeholder', function() {
        let source;
        let dest;

        before(function() {
            source = new InspireTree({
                data: function(node, resolve) {
                    if (node === null) {
                        resolve([{
                            text: 'Styled',
                            id: 'styled',
                            children: true
                        }]);
                    }
                    else {
                        resolve([{ text: 'Source Child' }]);
                    }
                }
            });

            dest = new InspireTree({
                data: function(node, resolve) {
                    if (node === null) {
                        resolve([]);
                    }
                    else {
                        resolve([{ text: 'Dest Child' }]);
                    }
                }
            });

            source.nodes(['styled']).copy(dest);
        });

        it('preserves dynamic-load capability on the destination copy', function() {
            const copy = dest.node('styled');
            expect(copy.hasLoadedOrWillLoadChildren()).to.be.true;
        });
    });
});
