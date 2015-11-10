'use strict';

describe('DOM', function() {
    beforeEach(function() {
        helpers.clearDOM();
        helpers.createTreeContainer();
    });

    it('accepts an HTMLElement', function() {
        var wrapped = function() {
            new InspireTree({
                target: document.querySelector('.tree'),
                data: []
            });
        };

        expect(wrapped).to.not.throw(TypeError);
    });

    it('accepts a selector', function() {
        var wrapped = function() {
            new InspireTree({
                target: '.tree',
                data: []
            });
        };

        expect(wrapped).to.not.throw(TypeError);
    });

    it('accepts a jQuery object', function() {
        var wrapped = function() {
            new InspireTree({
                target: $('.tree'),
                data: []
            });
        };

        expect(wrapped).to.not.throw(TypeError);
    });

    it('initializes the container', function() {
        new InspireTree({
            target: '.tree',
            data: []
        });

        var $tree = $('.tree');

        expect($tree.hasClass('inspire-tree')).to.be.true;
        expect($tree.find('> ol')).to.have.length(1);
        expect($tree.find('li')).to.have.length(0);
    });

    after(helpers.clearDOM);
});
