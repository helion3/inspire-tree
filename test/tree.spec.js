const chai = require('chai');
const expect = chai.expect;
const InspireTree = require('../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

// Polyfill getRandomValues
const crypto = require('crypto');
// eslint-disable-next-line no-undef
Object.defineProperty(globalThis, 'crypto', {
  value: {
    getRandomValues: arr => crypto.randomBytes(arr.length)
  }
});

// Do this once since it's global
const sinonChai = require('sinon-chai');
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
        const tree = new InspireTree({
            data: []
        });

        expect(tree).to.be.an('object');
    });
});
