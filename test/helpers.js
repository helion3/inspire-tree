(function(window) {
    'use strict';

    window.helpers = {

        /**
         * Clear the DOM.
         *
         * @return {void}
         */
        clearDOM: function() {
            $('body > :not(script)').remove();
        },

        /**
         * Create an empty element we can attach a tree instance to.
         *
         * @param {string} className Class name.
         * @return {void}
         */
        createTreeContainer: function(className) {
            var div = document.createElement('div');
            div.className = className || 'tree';
            document.body.appendChild(div);
        }
    };
}(window));
