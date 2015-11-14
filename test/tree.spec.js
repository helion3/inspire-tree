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

    it('throws error when no data loader given', function() {
        var wrapped = function() {
            new InspireTree({ target: '.tree' });
        };

        expect(wrapped).to.be.throw(Error);
    });

    var tree;

    it('returns APIs', function() {
        tree = new InspireTree({
            target: 'div',
            data: []
        });

        expect(tree).to.be.an('object');
    });

    after(helpers.clearDOM);
});
