const SlashCommand = require('./slash-command');
const WebAPI = require('./web-api');

class Slack {
  constructor() {
    this.config = {};
    this.slashCommand = new SlashCommand(this);
    this.webAPI = new WebAPI(this);
  }
}

module.exports = new Slack();