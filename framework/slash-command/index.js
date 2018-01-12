const Response = require('./response');
const _ = require('lodash');

modole.exports = class SlashCommand {
  constructor(slack) {
    this.slack = slack;
    this.middlewares = require('./middlewares')(this);
    this.commands = {};
  }

  definition(obj) {
    return _.extend({}, obj);
  }

  add(cmd) {
    this.commands[cmd.name] = cmd;
  }

  response() {
    return new Response();
  }

};