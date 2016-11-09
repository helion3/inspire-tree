'use strict';

describe('Inspire Tree', function() {
    before(function() {
        helpers.createTreeContainer();
    });

    it('exists in root', function() {
        expect(InspireTree).to.be.a('function');
    });

    it('throws error when no selector given', function() {
        expect(InspireTree).to.be.throw(TypeError);
    });

    var tree;

    it('returns API', function() {
        tree = new InspireTree({
            target: 'div',
            data: []
        });

        expect(tree).to.be.an('object');
    });

    after(helpers.clearDOM);
});
