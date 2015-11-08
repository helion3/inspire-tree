'use strict';

describe('Inspire Tree', function() {
    it('exists in root', function() {
        expect(InspireTree).to.be.a('function');
    });

    it('throws error when no selector given', function() {
        expect(InspireTree).to.be.throw(TypeError);
    });
});
