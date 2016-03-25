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

        expect(tree.nodes()).to.have.length(1);
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

        expect(tree.nodes()).to.have.length(1);
    });

    it('loads data via promise', function(done) {
        var tree = new InspireTree({
            target: '.tree',
            data: $.getJSON('/base/demos/sample-data/root.json')
        });

        tree.on('data.loaded', function(nodes) {
            expect(nodes).to.have.length(2);
            done();
        });

        tree.on('data.loaderror', function(err) {
            done(err);
        });
    });

    it('returns a promise', function() {
        var tree = new InspireTree({
            target: '.tree',
            data: []
        });

        expect(tree.load([]).then).to.be.a('function');
    });

    it('loads child node data dynamically', function() {
        var tree = new InspireTree({
            target: '.tree',
            data: function(node, resolve) {
                if (!node) {
                    resolve([{
                        text: 'A',
                        id: 1,
                        children: true
                    }]);
                }
                else {
                    resolve([{
                        text: 'B'
                    }]);
                }
            }
        });

        expect(tree.nodes()).to.have.length(1);

        var parent = tree.node(1);
        expect(parent.children).to.be.true;

        parent.expand();

        expect(parent.children).to.be.an('object');
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

        var nodes = tree.nodes();
        expect(nodes[0].text).to.equal('A');
        expect(nodes[1].text).to.equal('B');
        expect(nodes[2].text).to.equal('C');
    });

    it('delays event for synchronous loader', function(done) {
        var callback = sinon.spy();

        var tree = new InspireTree({
            target: '.tree',
            data: [{
                text: 'A'
            }]
        });

        tree.on('model.loaded', callback);

        setTimeout(function() {
            callback.should.have.been.called;
            done();
        });
    });

    after(helpers.clearDOM);
});
