/**
 * Voicemail application start.
 *
 * @module start
 * @copyright 2014, Digium, Inc.
 * @license Apache License, Version 2.0
 * @author Samuel Fortier-Galarneau <sgalarneau@digium.com>
 */

'use strict';

var forever = require('forever-monitor');

var config = require('./config.json');

var logger = require('voicemail-logging').create(
  config,
  'bootstrap'
);

var child = new (forever.Monitor)('app.js', {
  max: config.app.maxRestarts
});

child.on('restart', function() {
  logger.info('Voicemail restarting');
});

child.on('exit', function () {
  logger.error('app.js has exited after reaching max restarts');
});

child.start();
