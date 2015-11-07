'use strict';

// Libs
var EventEmitter = require('events').EventEmitter;

function InspireEvents() {};
InspireEvents.prototype = Object.create(EventEmitter.prototype);

module.exports = InspireEvents;
