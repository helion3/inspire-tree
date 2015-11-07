'use strict';

// Libs
var data = require('./lib/data');
var InspireDOM = require('./lib/dom');
var InspireEvents = require('./lib/events');

// Polyfills
require('./lib/now');
require('es6-promise').polyfill();

// CSS
require('./tree.scss');

module.exports = function InspireTree(opts) {
    var events = new InspireEvents();
    var dom = new InspireDOM(events);

    // Query the DOM and connect to our target element
    dom.linkTarget(opts.selector).catch(function(err) {
        events.emit('error', err);
    });

    // Listen for DOM interaction
    events.on('node.toggled', function(event) {
        console.log('node toggled', event);
    });

    // Load initial user data
    (function() {
        var promise = data.load(opts.data);
        promise.then(function(nodes) {
            events.emit('loaded', nodes);
            dom.renderNodes(nodes);
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
