const Command = require('./command');
const Action = require('./action');
const WebAPI = require('./web-api');

class Slack {
  constructor() {
    this.config = {};
    this.commands = new Command(this);
    this.actions = new Action(this);
    this.webAPI = new WebAPI(this);
  }
}

module.exports = new Slack();
