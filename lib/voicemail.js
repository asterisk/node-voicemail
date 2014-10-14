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
var dal = require('voicemail-data')(db);
var config = require('voicemail-config')(dal);
var prompt = require('voicemail-prompt')({
  config: config
});
var notify = require('voicemail-notify')({
  dal: dal,
  config: config
});
var mailbox = require('voicemail-mailbox')({
  dal: dal,
  prompt: prompt,
  config: config,
  notify: notify
});
var auth = require('voicemail-auth')({
  dal: dal,
  prompt: prompt,
  config: config
});
var fsm = require('voicemail-fsm')({
  dal: dal,
  prompt: prompt,
  config: config,
  mailbox: mailbox,
  auth: auth,
});

/**
 * Creates a voicemail application
 */
function create() {
  var ariConfig = config.getAppConfig().ari;

  ari.getClient(ariConfig, ariConfig.applicationName)
    .then(function(client) {
      client.on('StasisStart', fsm.create);
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
