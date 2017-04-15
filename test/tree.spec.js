var chai = require('chai');
var expect = chai.expect;
var InspireTree = require('../build/inspire-tree');

// Do this once since it's global
var sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);

describe('Inspire Tree', function() {
    it('exists as a function', function() {
        expect(InspireTree).to.be.a('function');
    });

    it('throws error when no data loader given', function() {
        expect(InspireTree).to.throw(TypeError);
    });

    it('returns API', function() {
        var tree = new InspireTree({
            data: []
        });

        expect(tree).to.be.an('object');
    });
});
