'use strict';

// Libs
var EventEmitter = require('eventemitter2');

function InspireEvents() {};
InspireEvents.prototype = Object.create(EventEmitter.prototype);

module.exports = InspireEvents;
