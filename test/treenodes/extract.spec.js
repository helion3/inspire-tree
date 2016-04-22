'use strict';

describe('TreeNodes.prototype.extract', function() {
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Create tree
        tree = new InspireTree({
            target: $('.tree'),
            data: [{
                text: 'A',
                id: 1,
                customBool: true,
                children: [{
                    pickMe: true,
                    text: 'B',
                    id: 2
                }, {
                    pickMe: true,
                    text: 'B',
                    id: 2
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().extract).to.be.a('function');
        expect(tree.extract).to.be.a('function');
    });

    it('returns merged heirarchy for matching nodes', function() {
        var matches = tree.nodes().extract('pickMe');

        expect(matches).to.have.length(1);

        expect(matches[0].id).to.equal('1');
        expect(matches[0].hasChildren()).to.be.true;
        expect(matches[0].children[0].id).to.equal('2');
    });

    after(helpers.clearDOM);
});
