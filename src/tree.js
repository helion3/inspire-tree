'use strict';

// Libs
var get = require('lodash.get');
var InspireData = require('./lib/data');
var InspireDOM = require('./lib/dom');
var InspireEvents = require('./lib/events');

// Polyfills
require('es6-promise').polyfill();

// CSS
require('./tree.scss');

module.exports = function InspireTree(opts) {
    if (!get(opts, 'selector')) {
        throw new TypeError('Selector is required.');
    }

    var api = new (function InspireApi() {});
    var data = api.data = new InspireData(api);
    var events = api.events = new InspireEvents();
    var dom = api.dom = new InspireDOM(api);

    // Query the DOM and connect to our target element
    dom.linkTarget(opts.selector).catch(function(err) {
        events.emit('error', err);
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

    return api;
};
