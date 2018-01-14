const Command = require('./command');
const Action = require('./action');
const WebAPI = require('./web-api');
const Constants = require('./common/constants');
const logger = require('./common/logger');

class Slack {
  constructor() {
    this.config = {
      immediateMessageTimeoutLimit: Constants.DEFAULT_IMMEDIATE_MESSAGE_TIMEOUT_LIMIT,
      logLevel: 'info',
    };
    this.commands = new Command(this);
    this.actions = new Action(this);
    this.webAPI = new WebAPI(this);
  }

  set(configName, configValue) {
    this.config[configName] = configValue;
    if (configName === 'logLevel') {
      logger.transports.console.level = configValue;
    }
  }
}

module.exports = new Slack();
