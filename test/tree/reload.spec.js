const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('Tree.reload', function() {
    let tree;
    const data = [{
        text: 'A'
    }];

    beforeEach(function() {
        tree = new InspireTree({
            data: data
        });
    });

    it('reloads data', function() {
        data.push({
            text: 'B'
        });

        tree.reload();

        expect(tree.nodes()).to.have.length(2);
    });
});
