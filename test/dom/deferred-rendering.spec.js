'use strict';

describe('Deferred Rendering', function() {
    var $tree;

    before(function() {
        helpers.clearDOM();
        helpers.createTreeContainer();

        $tree = $('.tree');

        new InspireTree({
            target: $tree,
            dom: {
                autoLoadMore: false,
                deferredRendering: true
            },
            pagination: {
                limit: 2
            },
            data: function(node, resolve) {
                var nodes = [];

                for (var i = 0; i < 6; i++) {
                    nodes.push({
                        text: 'Node ' + i
                    });
                }

                resolve(nodes);
            }
        });
    });

    it('renders a limited subset', function() {
        // Two visible nodes + "Load More"
        expect($tree.find('.title')).to.have.length(3);
    });

    it('renders larger subset on load more click', function() {
        $tree.find('.load-more').click();

        // Four visible nodes + "Load More"
        expect($tree.find('.title')).to.have.length(5);
    });

    it('renders full set on load more click', function() {
        $tree.find('.load-more').click();

        expect($tree.find('.title')).to.have.length(6);
    });

    after(helpers.clearDOM);
});
