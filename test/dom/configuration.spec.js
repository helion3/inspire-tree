'use strict';

describe('DOM Configurations', function() {
    beforeEach(function() {
        helpers.clearDOM();
        helpers.createTreeContainer();
    });

    it('accepts custom icon classes', function() {
        new InspireTree({
            target: '.tree',
            data: [{
                text: 'Test',
                itree: {
                    icon: 'fake'
                }
            }]
        });

        expect($('.tree').find('.title').hasClass('fake')).to.be.true;
    });

    it('accepts custom attributes for the LI', function() {
        new InspireTree({
            target: '.tree',
            data: [{
                text: 'Test',
                itree: {
                    li: {
                        attributes: {
                            'data-test': 'works'
                        }
                    }
                }
            }]
        });

        expect($('.tree').find('li').attr('data-test')).to.equal('works');
    });

    after(helpers.clearDOM);
});
