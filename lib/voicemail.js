/**
 * Voicemail application.
 *
 * @module voicemail
 * @copyright 2014, Digium, Inc.
 * @license Apache License, Version 2.0
 * @author Samuel Fortier-Galarneau <sgalarneau@digium.com>
 */

'use strict';

var ari = require('ari-client-wrapper');
var db = require('../config.json').db;
var logger = require('voicemail-logging').create(
    require('../config.json'),
    'voicemail'
);
var dal = require('voicemail-data')(db, {
  logger: logger
});

var config = require('voicemail-config')({
  dal: dal,
  logger: logger
});
var prompt = require('voicemail-prompt')({
  config: config,
  logger: logger
});
var notify = require('voicemail-notify')({
  dal: dal,
  config: config,
  logger: logger
});
var mailbox = require('voicemail-mailbox')({
  dal: dal,
  prompt: prompt,
  config: config,
  notify: notify,
  logger: logger
});
var auth = require('voicemail-auth')({
  dal: dal,
  prompt: prompt,
  config: config,
  logger: logger
});
var fsm = require('voicemail-fsm')({
  dal: dal,
  prompt: prompt,
  config: config,
  mailbox: mailbox,
  auth: auth,
  logger: logger
});

/**
 * Creates a voicemail application
 */
function create() {
  var ariConfig = config.getAppConfig().ari;

  ari.getClient(ariConfig, ariConfig.applicationName)
    .then(function(client) {
      logger.debug({
        ari: {
          url: ariConfig.url,
          username: ariConfig.username
        }
      }, 'Connected to ARI');

      client.on('StasisStart', fsm.create);

      logger.info('Voicemail application started');
    })
    .catch(function(err) {
      logger.error({err: err}, 'Error connecting to ARI');
      throw err;
    })
    .done();
}

/**
 * Returns module functions.
 *
 * @returns {object} module - module functions
 */
module.exports = {
  create: create
};
