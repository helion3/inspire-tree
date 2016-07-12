'use strict';

describe('TreeNodes.prototype.restore', function() {
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Create tree
        tree = new InspireTree({
            target: $('.tree'),
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'AA',
                    itree: {
                        state: {
                            removed: true
                        }
                    }
                }]
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
        expect(tree.nodes().restore).to.be.a('function');
        expect(tree.restore).to.be.a('function');
    });

    it('restores a node', function() {
        expect(tree.removed()).to.have.length(2);

        tree.restoreDeep();
        expect(tree.removed()).to.have.length(0);
    });

    after(helpers.clearDOM);
});
