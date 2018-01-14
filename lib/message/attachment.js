/*
 * Copyright (c) 2018 TopCoder, Inc. All rights reserved.
 */

/**
 * This module is the class to representing the attachment in slack message.
 *
 * @author TCSCODER
 * @version 1.0
 */

const _ = require('lodash');
const Base = require('./base');
const Button = require('./button');
const Menu = require('./menu');

module.exports = class Attachment extends Base {
  /**
   * Creates the instance.
   * @param {Object} options the options
   */
  constructor(options) {
    super(options);
    this.actions = [];
  }

  /**
   * Sets an action action handler.
   * @param {Object} action action handler.
   */
  setAction(action) {
    this.obj.callback_id = action.name;
  }

  /**
   * Adds a button to the attachment.
   * @param {Object} options the options.
   * @returns {Button} the button.
   */
  addButton(options) {
    const btn = new Button(options);
    this.actions.push(btn);
    return btn;
  }

  /**
   * Adds a menu to the attachment.
   * @param {Object} options
   * @returns {Menu} the menu.
   */
  addMenu(options) {
    const menu = new Menu(options);
    this.actions.push(menu);
    return menu;
  }

  /**
   * Converts the class instance to plain object.
   * @returns {Object} the object.
   */
  toObject() {
    const obj = _.assignIn({}, this.obj);
    if (this.actions.length > 0) {
      obj.actions = [];
      this.actions.forEach((a) => {
        obj.actions.push(a.toObject());
      });
    }
    return obj;
  }
};
