'use strict';

describe('Custom Class Names', function() {
    beforeEach(function() {
        helpers.createTreeContainer();
    });

    afterEach(helpers.clearDOM);

    it('appends custom string class names', function() {
        new InspireTree({
            target: '.tree',
            data: [{
                text: 'A',
                itree: {
                    li: {
                        attributes: {
                            class: 'testA.testB'
                        }
                    }
                }
            }]
        });

        expect($('.tree').find('li').hasClass('testA')).to.be.true;
    });

    it('appends custom string class names', function() {
        new InspireTree({
            target: '.tree',
            data: [{
                text: 'A',
                itree: {
                    li: {
                        attributes: {
                            class: 'testA testB'
                        }
                    }
                }
            }]
        });

        expect($('.tree').find('li').hasClass('testB')).to.be.true;
    });

    it('appends custom array of class names', function() {
        new InspireTree({
            target: '.tree',
            data: [{
                text: 'A',
                itree: {
                    li: {
                        attributes: {
                            className: ['testA', 'testB']
                        }
                    }
                }
            }]
        });

        expect($('.tree').find('li').hasClass('testB')).to.be.true;
    });

    it('appends custom array of class names', function() {
        new InspireTree({
            target: '.tree',
            data: [{
                text: 'A',
                itree: {
                    li: {
                        attributes: {
                            className: function() {
                                return ['testB'];
                            }
                        }
                    }
                }
            }]
        });

        expect($('.tree').find('li').hasClass('testB')).to.be.true;
    });
});
