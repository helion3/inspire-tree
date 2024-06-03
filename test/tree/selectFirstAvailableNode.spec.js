const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('Tree.selectFirstAvailableNode', function() {
    it('exists', function() {
        const tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1
            }]
        });

        expect(tree.selectFirstAvailableNode).to.be.a('function');
    });

    it('selects the first visible node', function() {
        const tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1
            }, {
                text: 'B',
                id: 2
            }]
        });

        tree.node(1).hide();
        tree.selectFirstAvailableNode();

        expect(tree.node(2).selected()).to.be.true;
    });

    it('selects the first selectable node', function() {
        const tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                itree: {
                    state: {
                        selectable: false
                    }
                }
            }, {
                text: 'B',
                id: 2
            }]
        });

        tree.selectFirstAvailableNode();

        expect(tree.node(2).selected()).to.be.true;
    });
});
