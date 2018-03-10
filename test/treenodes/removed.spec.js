const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNodes.prototype.removed', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
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
        expect(tree.nodes().removed).to.be.a('function');
        expect(tree.removed).to.be.a('function');
    });

    it('returns only removed nodes', function() {
        const removed = tree.removed();

        expect(removed).to.have.length(2);
        expect(removed[0].hasChildren()).to.be.false;
    });

    it('returns hierarchy of removed nodes', function() {
        const removed = tree.removed(true);

        expect(removed).to.have.length(2);
        expect(removed[0].hasChildren()).to.be.true;
    });
});
