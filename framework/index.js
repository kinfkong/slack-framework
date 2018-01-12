const SlashCommand = require('./slash-command');

class Slack {
  constructor() {
    this.config = {};
    this.slashCommand = new SlashCommand(this);
  }
}

module.exports = new Slack();