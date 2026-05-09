const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.toObject', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'B'
                }],
                itree: {
                    icon: 'icon-test'
                }
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).toObject).to.be.a('function');
    });

    it('returns a native object', function() {
        expect(tree.node(1).toObject().constructor.name).to.equal('Object');
    });

    it('retains user-provided (one-way, non-state) itree data', function() {
        const exported = tree.node(1).toObject();

        expect(exported.itree).to.be.an('object');
        expect(exported.itree.icon).to.equal('icon-test');
        expect(exported.itree.state).to.be.undefined;
    });

    it('retains state data', function() {
        const node = tree.node(1);
        node.select();

        const exported = node.toObject(false, true);

        expect(exported.itree).to.be.an('object');
        expect(exported.itree.state).to.be.an('object');
        expect(exported.itree.state.selected).to.be.true;
    });

    it('retains state data for children', function() {
        const node = tree.node(1);
        const child = node.children[0];
        child.select();

        const exported = node.toObject(false, true);

        expect(exported.children).to.be.an('array');
        expect(exported.children[0].itree.state).to.be.an('object');
        expect(exported.children[0].itree.state.selected).to.be.true;
    });

    it('copies state by value not by reference', function() {
        const node = tree.node(1);
        const exported = node.toObject(false, true);

        expect(exported.itree.state).to.not.equal(node.itree.state);
        expect(exported.itree.state.removed).to.be.false;

        node.softRemove();

        expect(node.itree.state.removed).to.be.true;
        expect(exported.itree.state.removed).to.be.false;
    });

    it('returns children as a native array', function() {
        expect(Array.isArray(tree.node(1).toObject().children)).to.be.true;
    });

    describe('dynamic children placeholder', function() {
        let dynamicTree;

        before(function() {
            dynamicTree = new InspireTree({
                data: function(node, resolve) {
                    if (node === null) {
                        resolve([{
                            text: 'Styled',
                            id: 'styled',
                            children: true
                        }]);
                    }
                    else {
                        resolve([{ text: 'Dynamic Child' }]);
                    }
                }
            });
        });

        it('preserves children: true placeholder', function() {
            const exported = dynamicTree.node('styled').toObject();
            expect(exported.children).to.equal(true);
        });

        it('respects excludeChildren=true for the placeholder', function() {
            const exported = dynamicTree.node('styled').toObject(true);
            expect(exported.children).to.be.undefined;
        });
    });
});
