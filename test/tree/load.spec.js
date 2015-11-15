'use strict';

describe('Tree.load', function() {
    beforeEach(function() {
        helpers.clearDOM();
        helpers.createTreeContainer();
    });

    it('loads data via array', function() {
        var tree = new InspireTree({
            target: '.tree',
            data: [{
                text: 'Test'
            }]
        });

        expect(tree.getNodes()).to.have.length(1);
    });

    it('loads data via callback', function() {
        var tree = new InspireTree({
            target: '.tree',
            data: function(node, resolve) {
                resolve([{
                    text: 'Test'
                }]);
            }
        });

        expect(tree.getNodes()).to.have.length(1);
    });

    it('loads data via promise', function(done) {
        var tree = new InspireTree({
            target: '.tree',
            data: $.getJSON('/base/sample-data/root.json')
        });

        tree.on('data.loaded', function(nodes) {
            expect(nodes).to.have.length(2);
            done();
        });

        tree.on('data.loaderror', function(err) {
            done(err);
        });
    });

    it('loads child node data dynamically', function() {
        var tree = new InspireTree({
            target: '.tree',
            dynamic: true,
            data: function(node, resolve) {
                if (!node) {
                    resolve([{
                        text: 'A',
                        id: 1
                    }]);
                }
                else {
                    resolve([{
                        text: 'B'
                    }]);
                }
            }
        });

        expect(tree.getNodes()).to.have.length(1);

        var parent = tree.getNode(1);
        expect(parent.children).to.be.undefined;

        parent.expand();
        expect(parent.children).to.not.be.undefined;
        expect(parent.children).to.have.length(1);
    });

    it('applies custom sorter', function() {
        var tree = new InspireTree({
            target: '.tree',
            data: [{
                text: 'C'
            }, {
                text: 'B'
            }, {
                text: 'A'
            }],
            sort: 'text'
        });

        var nodes = tree.getNodes();
        expect(nodes[0].text).to.equal('A');
        expect(nodes[1].text).to.equal('B');
        expect(nodes[2].text).to.equal('C');
    });

    after(helpers.clearDOM);
});
