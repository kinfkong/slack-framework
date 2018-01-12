const _ = require('lodash');

module.exports = class SlashCommand {
  constructor(slack) {
    this.slack = slack;
    this.middlewares = require('./middlewares')(this);
    this.commands = {};
  }

  define(obj) {
    const cmd =  _.extend({}, obj);
    if (!cmd.helpHandler && cmd.helpText) {
      cmd.helpHandler = (req, res, next) => {
        res.addText(helpText);
        res.end();
      }
    }
    return cmd;
  }

  add(cmd) {
    this.commands[cmd.name] = cmd;
  }

  get(commandName) {
    return this.commands[commandName];
  }

};