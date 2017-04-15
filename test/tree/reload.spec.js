var expect = require('chai').expect;
var InspireTree = require('../../build/inspire-tree');

describe('Tree.reload', function() {
    var tree;
    var data = [{
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
