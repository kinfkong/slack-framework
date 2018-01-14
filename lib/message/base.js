/*
 * Copyright (c) 2018 TopCoder, Inc. All rights reserved.
 */

/**
 * This module is the base class for all message component classes.
 *
 * @author TCSCODER
 * @version 1.0
 */


const _ = require('lodash');

module.exports = class Base {
  /**
   * Creates the instance.
   * @param {Object} options the options.
   */
  constructor(options) {
    if (_.isObject(options)) {
      this.obj = options;
    } else {
      this.obj = {
        text: options,
      };
    }
  }

  /**
   * Adds a text to the message component.
   * @param {String} text the text to add.
   */
  addText(text) {
    if (this.obj.text) {
      this.obj.text = `${this.obj.text}\n${text}`;
    } else {
      this.obj.text = text;
    }
  }

  /**
   * Merge the properties to a message component.
   * @param {Object} obj the properties to merge.
   */
  assignIn(obj) {
    this.obj = _.assignIn(this.obj, obj);
  }

  /**
   * Sets a property to a message component.
   * @param {String} fieldName the field name.
   * @param {String} fieldValue the field value
   */
  set(fieldName, fieldValue) {
    this.obj[fieldName] = fieldValue;
  }

  /**
   * Converts the class instance to plain object.
   * @returns {Object} the object.
   */
  toObject() {
    return _.assignIn({}, this.obj);
  }
};
