'use strict';

describe('Loaders', function() {
    beforeEach(function() {
        helpers.clearDOM();
        helpers.createTreeContainer();
    });

    it('loads data via array', function() {
        var tree = new InspireTree({
            target: '.tree',
            data: [{
                title: 'Test'
            }]
        });

        expect(tree.data.getNodes()).to.have.length(1);
    });

    it('loads data via promise', function(done) {
        var tree = new InspireTree({
            target: '.tree',
            data: $.getJSON('/base/sample-data/root.json')
        });

        tree.events.on('data.loaded', function(nodes) {
            expect(nodes).to.have.length(2);
            done();
        });

        tree.events.on('data.loaderror', function(err) {
            done(err);
        });
    });

    it('loads data via callback', function() {
        var tree = new InspireTree({
            target: '.tree',
            data: function(node, resolve) {
                resolve([{
                    title: 'Test'
                }]);
            }
        });

        expect(tree.data.getNodes()).to.have.length(1);
    });

    it('loads child node data dynamically', function() {
        var tree = new InspireTree({
            target: '.tree',
            dynamic: true,
            data: function(node, resolve) {
                if (!node) {
                    resolve([{
                        title: 'A',
                        id: 1
                    }]);
                }
                else {
                    resolve([{
                        title: 'B'
                    }]);
                }
            }
        });

        expect(tree.data.getNodes()).to.have.length(1);

        var parent = tree.data.getNode(1);
        expect(parent.children).to.be.undefined;

        tree.data.expandNode(parent);
        expect(parent.children).to.not.be.undefined;
        expect(parent.children).to.have.length(1);
    });

    after(helpers.clearDOM);
});
