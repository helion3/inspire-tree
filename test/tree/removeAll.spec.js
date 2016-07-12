'use strict';

describe('Tree.removeAll', function() {
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

    it('removes all nodes', function() {
        expect(tree.nodes()).to.have.length(1);

        tree.removeAll();

        expect(tree.nodes()).to.have.length(0);
    });

    after(helpers.clearDOM);
});
