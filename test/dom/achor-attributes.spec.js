'use strict';

describe('Custom Anchor Attributes', function() {
    beforeEach(function() {
        helpers.createTreeContainer();
    });

    afterEach(helpers.clearDOM);

    it('uses a custom href', function() {
        new InspireTree({
            target: '.tree',
            data: [{
                text: 'A',
                itree: {
                    a: {
                        attributes: {
                            href: 'http://inspire-tree.com'
                        }
                    }
                }
            }]
        });

        expect($('.tree').find('a').attr('href')).to.equal('http://inspire-tree.com');
    });
});
