'use strict';

// Libs
var data = require('./lib/data');
var InsireEvents = require('./lib/events');

// Polyfills
require('./lib/now');
require('es6-promise').polyfill();

// CSS
require('./tree.scss');

module.exports = function InspireTree(opts) {
    var events = new InsireEvents();

    // Load initial user data
    (function() {
        var promise = data.load(opts.data);
        promise.then(function(nodes) {
            events.emit('loaded', nodes);
        });

        promise.catch(function(err) {
            events.emit('error', err);
        });
    }());

    // Define an API we'll return to the user
    return new (function InspireApi() {
        this.data = data;
        this.events = events;
    });
};
