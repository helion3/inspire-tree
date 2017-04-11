'use strict';

describe('Deferred Loading', function() {
    describe('Loading', function() {
        var $tree;
        var tree;

        before(function() {
            helpers.clearDOM();
            helpers.createTreeContainer();

            $tree = $('.tree');

            tree = new InspireTree({
                target: $tree,
                deferredLoading: true,
                pagination: {
                    limit: 2
                },
                data: function(node, resolve, reject, pagination) {
                    resolve([{
                        text: 'A'
                    }, {
                        text: 'B'
                    }], 6);
                }
            });
        });

        it('loads a limited subset', function() {
            expect(tree.nodes()).to.have.length(2);
            expect($tree.find('li')).to.have.length(3);
        });

        it('renders larger subset on load more click', function() {
            $tree.find('.load-more').click();

            expect(tree.nodes()).to.have.length(4);
            expect($tree.find('li')).to.have.length(5);
        });

        it('renders larger subset on load more click', function(done) {
            setTimeout(function() {
                $tree.find('.load-more').click();

                expect(tree.nodes()).to.have.length(6);
                expect($tree.find('li')).to.have.length(6);

                done();
            });
        });

        after(helpers.clearDOM);
    });

    describe('Nested Loading', function() {
        var $tree;
        var tree;

        before(function() {
            helpers.clearDOM();
            helpers.createTreeContainer();

            $tree = $('.tree');

            tree = new InspireTree({
                target: $tree,
                deferredLoading: true,
                pagination: {
                    limit: 2
                },
                data: function(node, resolve, reject, pagination) {
                    resolve([{
                        text: 'A',
                        children: true
                    }, {
                        text: 'B'
                    }], 6);
                }
            });
        });

        it('loads a limited subset', function() {
            expect(tree.nodes()).to.have.length(2);
            expect($tree.find('li')).to.have.length(4);
        });

        var rootParentNode;
        var level2ParentNode;

        it('loads a limited level 2 subset', function() {
            var rootParentId = $tree.find('li:eq(0)').data('uid');

            rootParentNode = tree.node(rootParentId);
            rootParentNode.expand();

            expect(rootParentNode.children).to.have.length(2);
        });

        it('loads a limited level 2 subset', function() {
            level2ParentNode = rootParentNode.children[0];

            level2ParentNode.expand();

            expect(level2ParentNode.children).to.have.length(2);
        });

        it('loads a limited level 3 subset', function() {
            var level3ParentNode = level2ParentNode.children[0];

            level3ParentNode.expand();

            expect(level3ParentNode.children).to.have.length(2);
        });

        after(helpers.clearDOM);
    });
});
