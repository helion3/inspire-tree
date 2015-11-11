'use strict';

describe('Modification', function() {
    var tree1;
    var $tree1;

    var tree2;

    before(function() {
        helpers.createTreeContainer();
        helpers.createTreeContainer('tree2');

        tree1 = new InspireTree({
            target: '.tree',
            data: [{
                title: 'A',
                id: 1
            }, {
                title: 'B',
                id: 2,
                children: [{
                    title: 'B1',
                    id: 20
                }]
            }]
        });

        $tree1 = $('.tree');

        tree2 = new InspireTree({
            target: '.tree2',
            data: []
        });
    });

    it('adds a node', function() {
        tree1.data.addNode({
            title: 'C'
        });

        // Model
        expect(tree1.data.getNodes()).to.have.length(3);
        expect(tree1.data.getNodes()[2].title).to.equal('C');

        // DOM
        expect($tree1.find('> ol > li')).to.have.length(3);
    });

    it('adds an array of nodes', function() {
        tree1.data.addNodes([{
            title: 'D'
        }, {
            title: 'E'
        }]);

        expect(tree1.data.getNodes()).to.have.length(5);
    });

    it('throws error if destination tree isn\'t recognized', function() {
        expect(tree1.data.copyNodes().to).to.throw(Error);
    });

    it('copies all nodes to a new tree', function() {
        expect(tree2.data.getNodes()).to.have.length(0);

        tree1.data.copyNodes().to(tree2);
        expect(tree2.data.getNodes()).to.have.length(5);

        tree2.data.removeAll();
    });

    it('copies given nodes to a new tree', function() {
        expect(tree2.data.getNodes()).to.have.length(0);

        tree1.data.copyNodes(tree1.data.getNodes()).to(tree2);
        expect(tree2.data.getNodes()).to.have.length(5);

        tree2.data.removeAll();
    });

    it('copies selected node to a new tree', function() {
        expect(tree2.data.getNodes()).to.have.length(0);

        var node = tree1.data.getNodeById(1);
        tree1.data.selectNode(node);
        tree1.data.copyNodes(tree1.data.getSelectedNodes()).to(tree2);

        expect(tree2.data.getNodes()).to.have.length(1);
        expect(tree2.data.getNodes()[0].id).to.equal('1');

        tree2.data.removeAll();
    });

    it('copies specific node to a new tree', function() {
        expect(tree2.data.getNodes()).to.have.length(0);

        var node = tree1.data.getNodeById(1);
        tree1.data.copyNode(node).to(tree2);

        expect(tree2.data.getNodes()).to.have.length(1);
        expect(tree2.data.getNodes()[0].id).to.equal('1');

        tree2.data.removeAll();
    });

    it('copies child node to a new tree', function() {
        expect(tree2.data.getNodes()).to.have.length(0);

        var node = tree1.data.getNodeById(20);
        tree1.data.copyNode(node).to(tree2);

        expect(tree2.data.getNodes()).to.have.length(1);
        expect(tree2.data.getNodes()[0].id).to.equal('20');

        tree2.data.removeAll();
    });

    it('copies child node and its hierarchy to a new tree', function() {
        expect(tree2.data.getNodes()).to.have.length(0);

        var node = tree1.data.getNodeById(20);
        tree1.data.copyNode(node, true).to(tree2);

        expect(tree2.data.getNodes()).to.have.length(1);
        expect(tree2.data.getNodes()[0].id).to.equal('2');

        tree2.data.removeAll();
    });

    it('merges new nodes on copy', function() {
        // Move all nodes over
        tree1.data.copyNodes().to(tree2);

        // Check original child count
        expect(tree1.data.getNodeById(2).children).to.have.length(1);

        // Push a new child to the copied data
        var parent = tree2.data.getNodeById(2);
        parent.addChild({
            title: 'New'
        });

        // Re-copy the node to the original tree
        tree2.data.copyNode(parent, true).to(tree1);
        expect(tree1.data.getNodeById(2).children).to.have.length(2);

        tree2.data.removeAll();
    });

    it('shows child node when merged back into source via api', function() {
        var node = tree1.data.getNodeById(20);

        // Hide source copy
        tree1.data.hideNode(node);
        expect(node.itree.state.hidden).to.be.true;

        // Move it
        tree1.data.copyNode(node, true).to(tree2);

        // Check new copy
        var clone = tree2.data.getNodeById(20);
        expect(clone.itree.state.hidden).to.be.false;

        // Move back
        tree2.data.copyNode(clone, true).to(tree1);

        // Check source
        expect(node.itree.state.hidden).to.be.false;

        tree2.data.removeAll();
    });

    it('shows child node when merged back into source by selection', function() {
        var node = tree1.data.getNodeById(20);

        // Hide source copy
        tree1.data.hideNode(node);
        expect(node.itree.state.hidden).to.be.true;

        // Move it
        tree1.data.copyNode(node, true).to(tree2);

        // Check new copy
        var clone = tree2.data.getNodeById(20);
        expect(clone.itree.state.hidden).to.be.false;

        // Re-select in destination
        tree2.data.selectNode(clone);
        var selected = tree2.data.getSelectedNodes();

        // Move back
        tree2.data.copyNodes(selected, true).to(tree1);

        // Check source
        expect(node.itree.state.hidden).to.be.false;

        tree2.data.removeAll();
    });

    it('only shows nodes merged back in', function() {
        // Move all to one tree
        tree1.data.copyNodes().to(tree2);
        tree1.data.hideAll();

        var node = tree2.data.getNodeById(20);
        tree2.data.copyNode(node, true).to(tree1);

        expect(tree1.data.getNodes()[0].itree.state.hidden).to.be.true;
        expect(tree1.data.getNodes()[1].itree.state.hidden).to.be.false;
        expect(tree1.data.getNodes()[1].children[0].itree.state.hidden).to.be.false;
        expect(tree1.data.getNodes()[1].children[1].itree.state.hidden).to.be.true;

        tree2.data.removeAll();
    });

    it('removes a node', function() {
        var node = tree1.data.getNode(1);
        tree1.data.removeNode(node);

        expect(tree1.data.getNodes()).to.have.length(4);
    });

    after(helpers.clearDOM);
});
