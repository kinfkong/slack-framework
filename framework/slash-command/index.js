const _ = require('lodash');

module.exports = class SlashCommand {
  constructor(slack) {
    this.slack = slack;
    this.middlewares = require('./middlewares')(this);
    this.commands = {};
  }

  define(obj) {
    return _.extend({}, obj);
  }

  add(cmd) {
    this.commands[cmd.name] = cmd;
  }

  get(commandName) {
    return this.commands[commandName];
  }

};