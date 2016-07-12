'use strict';

describe('TreeNodes.prototype.selectable', function() {
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Create tree
        tree = new InspireTree({
            target: $('.tree'),
            data: [{
                text: 'A',
                id: 1
            }, {
                text: 'B',
                id: 2,
                itree: {
                    state: {
                        selectable: false
                    }
                }
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().selectable).to.be.a('function');
        expect(tree.selectable).to.be.a('function');
    });

    it('returns all selectable nodes', function() {
        expect(tree.selectable()).to.have.length(1);
    });

    after(helpers.clearDOM);
});
