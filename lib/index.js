/*
 * Copyright (c) 2018 TopCoder, Inc. All rights reserved.
 */

/**
 * This module is the class to representing slack framework.
 *
 * @author TCSCODER
 * @version 1.0
 */

const Command = require('./command');
const Action = require('./action');
const WebAPI = require('./web-api');
const Constants = require('./common/constants');
const logger = require('./common/logger');

class Slack {
  /**
   * Creates the instance.
   */
  constructor() {
    this.config = {
      immediateMessageTimeoutLimit: Constants.DEFAULT_IMMEDIATE_MESSAGE_TIMEOUT_LIMIT,
      logLevel: 'info',
    };
    this.commands = new Command(this);
    this.actions = new Action(this);
    this.webAPI = new WebAPI(this);
  }

  /**
   * Sets the slack configuration.
   * @param {String} configName name of the config.
   * @param {*} configValue the value of the config.
   */
  set(configName, configValue) {
    this.config[configName] = configValue;
    if (configName === 'logLevel') {
      logger.transports.console.level = configValue;
    }
  }
}

module.exports = new Slack();
