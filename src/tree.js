'use strict';

// Libs
var data = require('./lib/data');

require('./lib/now');
require('es6-promise').polyfill();
require('./tree.scss');

module.exports = function InspireTree(opts) {
    console.log(opts);

    // Load initial user data
    (function() {
        var promise = data.load(opts.data);
        promise.then(function(nodes) {
            console.log('loaded', nodes);
        });

        promise.catch(function() {
            // @todo handle error
        });
    }());
};
