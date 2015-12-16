'use strict';

describe('Tree.reload', function() {
    var tree;
    var data = [{
        text: 'A'
    }];

    beforeEach(function() {
        helpers.clearDOM();
        helpers.createTreeContainer();

        tree = new InspireTree({
            target: '.tree',
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

    after(helpers.clearDOM);
});
