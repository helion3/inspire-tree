const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.uncheck', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'AA',
                    id: 11
                }, {
                    text: 'AB',
                    id: 12
                }]
            }, {
                text: 'B',
                id: 2
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).uncheck).to.be.a('function');
    });

    it('unchecks the node', function() {
        const node = tree.node(2);
        node.check();
        expect(node.checked()).to.be.true;

        node.uncheck();
        expect(node.checked()).to.be.false;
    });

    it('unchecks child nodes', function() {
        const node = tree.node(1);
        node.check();
        node.children.each((child) => {
            expect(child.checked()).to.be.true;
        });

        node.uncheck();
        node.children.each((child) => {
            expect(child.checked()).to.be.false;
        });
    });
});
