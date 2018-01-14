/*
 * Copyright (c) 2018 TopCoder, Inc. All rights reserved.
 */

/**
 * This module is the class to manage the action handlers.
 *
 * @author TCSCODER
 * @version 1.0
 */

const _ = require('lodash');
const MiddleWare = require('./middlewares');

module.exports = class Action {
  /**
   * Creates the instance.
   * @param {Object} slack the slack instance.
   * @param {String} type 'action' or 'command'
   */
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

  /**
   * Adds an action.
   * @param {Object} obj the action definition.
   * @returns {Action} the created action.
   */
  add(obj) {
    const action = _.assignIn({}, obj);
    if (!action.responseType) {
      action.responseType = 'ephemeral';
    }
    this.actions[action.name] = action;
    return action;
  }

  /**
   * Adds an action.
   * @param {Object} obj the action definition.
   * @returns {Action} the created action.
   */
  addAction(obj) {
    return this.add(obj);
  }

  /**
   * Gets the action by its name.
   * @param {String} name the name of the action.
   * @returns {Action} the action or null if not exists.
   */
  get(name) {
    return this.actions[name];
  }
};
