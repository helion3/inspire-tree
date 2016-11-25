'use strict';

describe('TreeNode.prototype.hasLoadedChildren', function() {
    var $tree;
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Query DOM
        $tree = $('.tree');

        // Create tree
        tree = new InspireTree({
            target: '.tree',
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

    it('shows loading node', function() {
        tree.node(3).expand();
        expect($tree.find('[data-uid=3] .leaf .title').text()).to.equal('Loading...');
    });

    it('shows empty node', function() {
        tree.node(2).expand();
        expect($tree.find('[data-uid=2] .leaf .title').text()).to.equal('No Results');
    });

    it('returns true for a node which has loaded with an empty result', function() {
        expect(tree.node(2).hasLoadedChildren()).to.be.true;
    });

    it('returns true for a node which has loaded with children', function(done) {
        tree.node(1).expand().then(function() {
            expect(tree.node(1).hasLoadedChildren()).to.be.true;
            done();
        });
    });

    after(helpers.clearDOM);
});
