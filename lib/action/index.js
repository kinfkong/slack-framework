const _ = require('lodash');
const MiddleWare = require('./middlewares');

module.exports = class Action {
  constructor(slack, type) {
    let classType = type;
    if (!type) {
      classType = 'action';
    }

    this.type = classType;
    this.slack = slack;
    this.middlewares = MiddleWare(this.slack, this.type);
    this.actions = {};
  }

  add(obj) {
    const action = _.assignIn({}, obj);
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
