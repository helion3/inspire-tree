'use strict';

describe('TreeNodes.prototype.visible', function() {
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
                itree: {
                    state: {
                        removed: true
                    }
                }
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().visible).to.be.a('function');
        expect(tree.visible).to.be.a('function');
    });

    it('returns only visible nodes', function() {
        expect(tree.nodes().visible()).to.have.length(1);
    });

    after(helpers.clearDOM);
});
