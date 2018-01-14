/*
 * Copyright (c) 2018 TopCoder, Inc. All rights reserved.
 */

/**
 * This module is the class to representing the menu in slack message.
 *
 * @author TCSCODER
 * @version 1.0
 */

const Action = require('./action');

module.exports = class Menu extends Action {
  /**
   * Creates the instance.
   * @param {Object} options the options
   */
  constructor(options) {
    super(options);
    this.obj.type = 'select';
  }
};
