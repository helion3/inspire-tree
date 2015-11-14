'use strict';

describe('TreeNode', function() {
    var tree;
    var node;

    before(function() {
        helpers.createTreeContainer();

        tree = new InspireTree({
            target: '.tree',
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'AA',
                    id: 11,
                    children: [{
                        text: 'AAA',
                        id: 111
                    }]
                }]
            }]
        });

        node = tree.getNode(1);
    });

    describe('"addChild" method', function() {
        it('exists', function() {
            expect(node.addChild).to.be.a('function');
        });
    });

    describe('"collapse" method', function() {
        it('exists', function() {
            expect(node.collapse).to.be.a('function');
        });

        it('collapses node', function() {
            node.collapse();

            expect(node.itree.state.collapsed).to.be.true;
        });
    });

    describe('"deselect" method', function() {
        it('exists', function() {
            expect(node.deselect).to.be.a('function');
        });
    });

    describe('"expand" method', function() {
        it('exists', function() {
            expect(node.expand).to.be.a('function');
        });
    });

    describe('"hide" method', function() {
        it('exists', function() {
            expect(node.hide).to.be.a('function');
        });
    });

    describe('"getParent" method', function() {
        it('exists', function() {
            expect(node.getParent).to.be.a('function');
        });

        it('returns undefined parent for root', function() {
            expect(node.getParent()).to.be.undefined;
        });

        it('returns immediate parent', function() {
            expect(tree.getNode(11).getParent().id).to.equal('1');
        });
    });

    describe('"select" method', function() {
        it('exists', function() {
            expect(node.select).to.be.a('function');
        });
    });

    describe('"set" method', function() {
        it('exists', function() {
            expect(node.set).to.be.a('function');
        });

        it('updates node text', function() {
            node.set('newProp', 'hello');

            expect(node.newProp).to.equal('hello');
            expect(node.itree.dirty).to.be.true;
        });
    });

    describe('"show" method', function() {
        it('exists', function() {
            expect(node.show).to.be.a('function');
        });
    });

    after(helpers.clearDOM);
});
