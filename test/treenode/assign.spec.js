const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.assign', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1
            }, {
                text: 'B',
                id: 2
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).assign).to.be.a('function');
    });

    it('assigns source object to the node', function() {
        const node = tree.node(1);
        node.assign({
            newProp: 1,
            text: 'C'
        });

        expect(node.newProp).to.equal(1);
        expect(node.text).to.equal('C');
    });

    it('assigns multiple source objects to the node', function() {
        const node = tree.node(1);
        node.assign({
            step: 1,
            a: 1
        }, {
            step: 2,
            b: 1
        });

        expect(node.step).to.equal(2);
        expect(node.a).to.equal(1);
        expect(node.b).to.equal(1);
    });
});
