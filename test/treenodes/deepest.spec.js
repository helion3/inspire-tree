'use strict';

describe('TreeNodes.prototype.deepest', function() {
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Create tree
        tree = new InspireTree({
            target: $('.tree'),
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'B',
                    company: 'Test'
                }]
            }, {
                text: 'C',
                company: 'Test'
            }, {
                text: 'D',
                company: 'Test',
                children: true
            }]
        });
    });

    it('exists', function() {
        expect(tree.getNodes().deepest).to.be.a('function');
    });

    it('returns only deepest nodes', function() {
        var deepest = tree.getNodes().deepest();

        expect(deepest).to.have.length(2);
        expect(deepest[0].text).to.equal('B');
    });

    after(helpers.clearDOM);
});
