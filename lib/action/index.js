const _ = require('lodash');

module.exports = class Action {

  constructor(slack, type) {
    let classType = type;
    if (!type) {
      classType = 'action';
    }

    this.type = classType;
    this.slack = slack;
    this.middlewares = require('./middlewares')(this.slack, this.type);
    this.actions = {};
  }

  add(obj) {
    const action = _.extend({}, obj);
    if (!action.responseType) {
      action.responseType = 'ephemeral';
    }
    this.actions[action.name] = action;
    return action;
  }

  addAction(obj) {
    return this.add(obj);
  }
  get(name) {
    return this.actions[name];
  }
};